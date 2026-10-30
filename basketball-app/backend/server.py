from flask import Flask, jsonify, request
from flask_cors import CORS
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, commonallplayers
import time
import unicodedata
import os
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from zoneinfo import ZoneInfo

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "NBA Basketball Stats API is running"
    }

# Reuse saved player stats for one hour before fetching an updated response.

CACHE_TTL_SECONDS = 60 * 60

# Serverless deployments use temporary writable storage; this cache is disposable.
if os.environ.get("VERCEL"):
    CACHE_DIR = "/tmp/cache"
else:
    CACHE_DIR = "cache"


os.makedirs(CACHE_DIR, exist_ok=True)

API_KEY = os.getenv('VITE_APP_API_KEY')



def normalize_name(value):
    normalized = unicodedata.normalize("NFKD", value or "")
    without_accents = "".join(
        character for character in normalized if not unicodedata.combining(character)
    )
    return " ".join(without_accents.lower().split())

def cache_file_path(key):
    safe_key = normalize_name(key).replace(" ", "_").replace(".", "")
    return os.path.join(CACHE_DIR, f"{safe_key}.json")

def get_file_cache(key):
    path = cache_file_path(key)
    # A missing file means this player needs a fresh fetch.
    if not os.path.exists(path):
        return None
    
    # Measure the file's age using its last modification time.
    cache_age = time.time() - os.path.getmtime(path)
    
    # Return None so the route fetches new stats when the cache expires.
    if cache_age >= CACHE_TTL_SECONDS:
        print("FILE CACHE EXPIRED:", key, flush=True)
        return None
    
    # Return the saved response while it is still within the cache lifetime.
    with open(path, "r") as file:
        return json.load(file)
        
def save_file_cache(key, data):
    path = cache_file_path(key)
    # Writing fresh stats also resets the file's modification time.
    with open(path, "w") as file:
        json.dump(data, file)

def get_player_id(first_name, last_name):
    normalized_first_name = normalize_name(first_name)
    normalized_last_name = normalize_name(last_name)
    normalized_full_name = f"{normalized_first_name} {normalized_last_name}"

    # Try the bundled player list first to avoid a network request for known names.
    all_players = players.get_players()
    static_matches = [
        player
        for player in all_players
            if normalize_name(player["full_name"]) == normalized_full_name

    ]
    if static_matches:
        active_player = next(
        (player for player in static_matches if player["is_active"]),
        static_matches[0]
    )
        return active_player["id"]
    
    if os.environ.get("VERCEL"):
        return None
    
    # For names absent from the bundled list, try the current-season NBA roster.
    # NBA endpoints use a start/end label rather than the frontend's ending year.
    today = datetime.now(ZoneInfo("America/New_York"))

    start_year = today.year if today.month >= 10 else today.year - 1

    current_season = f"{start_year}-{str(start_year + 1)[-2:]}"
    season_players = commonallplayers.CommonAllPlayers(
        is_only_current_season=1,
        season=current_season
    ).get_data_frames()[0]

    for _, row in season_players.iterrows():
        display_name = row.get("DISPLAY_FIRST_LAST", "")
        if normalize_name(display_name) == normalized_full_name:
            return int(row["PERSON_ID"])

    return None

@app.route('/api/player_stats', methods=['GET'])
def get_player_stats():
    first_name = request.args.get('firstName', "").strip()
    last_name = request.args.get('lastName', "").strip()

    if not first_name or not last_name:
        return jsonify({"error": "Missing firstName or lastName"}), 400

    # Reconcile SportsData player names with the names used by the stats providers.
    if first_name == 'Ron' and last_name == 'Holland II':
        first_name = 'Ronald'
    if first_name == 'L.J.' and last_name == 'Cryer':
        first_name = 'LJ'
    if first_name == 'Bronny' and last_name == 'James Jr.':
        last_name = 'James'
    if first_name == 'Alperen' and last_name == 'Sengün':
        last_name = 'Sengun'
    if first_name == 'Yanic Konan' and last_name == 'Niederhauser':
        last_name = 'Niederhäuser'
    if first_name == 'GG' and last_name == 'Jackson II':
        last_name = 'Jackson'
    if first_name == 'David' and last_name == 'Jones-Garcia':
        last_name = 'Jones Garcia'
    if first_name == 'Alexandre' and last_name == 'Sarr':
        first_name = 'Alex'

    key = f"{first_name} {last_name}"

    # Check the file cache on every single request so expiration cannot be bypassed.
    file_cached = get_file_cache(key)

    if file_cached is not None:
        print("FILE CACHE HIT:", key, flush=True)
        return jsonify(file_cached)
    
    # Missing or expired cached data continues to the fetch logic below.
    print("FETCHING FRESH STATS:", key, flush=True)

    player_id = get_player_id(first_name, last_name)

    if not player_id:
        return jsonify({"error": "No Player statistics available."}), 404

    retries = 1
    retry_delay = 1

    for attempt in range(retries):
        
        try:
            # On Vercel, go directly to the Basketball Reference fallback below.
            if os.environ.get("VERCEL"):
                raise RuntimeError("Skipping NBA API on Vercel")
            career = playercareerstats.PlayerCareerStats(
                player_id=player_id,
                timeout=3
                )
            data = career.get_data_frames()
            if not data or len(data) == 0:
                return jsonify({"error": "No stats found"}), 404

            stats = data[0].to_dict(orient='records')
            print("STATS", stats)

            if not stats:
                print("No NBA career stats returned for:", key)
                raise ValueError("NBA career stats unavailable")

            # Cache only nonempty successful responses so failures can be retried.

            save_file_cache(key, stats)

            print("Fetched + cached:", key)
            return jsonify(stats)
        except Exception as nba_error:
            print("NBA API failed", repr(nba_error))
            try:
                bbref_id = request.args.get("bbrefId", "").strip()
                if not bbref_id:
                    raise ValueError("Missing Basketball Reference ID")
                lastNameFirstLetter = bbref_id[0]
                bbref_url = f"https://www.basketball-reference.com/players/{lastNameFirstLetter}/{bbref_id}.html"
                response = requests.get(bbref_url, timeout=10)

                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                per_game_table = soup.find("table", id="per_game_stats")
                if not per_game_table:
                    raise ValueError("Per game stats table not found")
                
                table_body = per_game_table.find("tbody")
                if not table_body:
                    raise ValueError("Per game stats table body not found")
                rows = table_body.find_all("tr")

                season_stats = []

                for row in rows:
                    season = {}
                    cells = row.find_all(["th", "td"])

                    for cell in cells:
                        data_stat = cell.get("data-stat")

                        if data_stat:
                            season[data_stat] = cell.get_text(strip=True)
                    if season:
                        season_stats.append(season)

                # Preserve the fallback's named fields; the frontend normalizes both formats.
                response_data = {
                    "message": "Basketball Reference fallback succeeded",
                    "bbrefId": bbref_id,
                    "status": response.status_code,
                    "seasonStats": season_stats
                }
                save_file_cache(key, response_data)
                return jsonify(response_data), 200
            except Exception as error:
                print(f"Player stats error (attempt {attempt + 1}):", 
                  repr(error))
            if attempt < retries - 1:
                time.sleep(retry_delay)
            else:
                return jsonify({
                    "error": "NBA stats request timed out"
                }), 504
            

@app.route('/api/player_info', methods=['GET'])
def get_player_info():
        player_id = request.args.get('playerId', "").strip()
        if not player_id:
            return jsonify({"error": "No Player ID found"}), 400
        player_info_url = f"https://api.sportsdata.io/v3/nba/scores/json/Player/{player_id}?key={API_KEY}"
        response = requests.get(player_info_url, timeout=10)
        return jsonify(response.json())

@app.route('/api/team_roster', methods=['GET'])
def get_team_roster():
    team = request.args.get('team', "").strip()
    if not team:
        return jsonify({"error": "No Team Found"}), 400
    team_abbr_url = f"https://api.sportsdata.io/v3/nba/scores/json/Players/{team}?key={API_KEY}"
    response = requests.get(team_abbr_url, timeout=10)
    return jsonify(response.json())

@app.route('/api/standings', methods=['GET'])
def get_standings():
    season = request.args.get('season', "").strip()
    if not season:
        return jsonify({"error": "No Season Found"}), 400
    season_url = f"https://api.sportsdata.io/v3/nba/scores/json/Standings/{season}?key={API_KEY}"
    try:

        response = requests.get(season_url, timeout=10)
        # Treat unsuccessful provider responses as failures.
        response.raise_for_status()
        data = response.json()
        # Standings must be a list of teams.
        if not isinstance(data, list):
            return jsonify({"error": "Invalid standings response"}), 502
        return jsonify(data), 200
    except requests.exceptions.Timeout:
        return jsonify({"error": "Standings request timed out"}), 504

@app.route('/api/teams', methods=['GET'])
def get_league_teams():
    league_url = f"https://api.sportsdata.io/v3/nba/scores/json/teams?key={API_KEY}"
    response = requests.get(league_url, timeout=10)
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True, port=5001)