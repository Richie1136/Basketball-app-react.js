from flask import Flask, jsonify, request
from flask_cors import CORS
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats, commonallplayers
import time
import unicodedata

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "NBA Basketball Stats API is running"
    }

cache = {}


def normalize_name(value):
    normalized = unicodedata.normalize("NFKD", value or "")
    without_accents = "".join(
        character for character in normalized if not unicodedata.combining(character)
    )
    return " ".join(without_accents.lower().split())


def get_player_id(first_name, last_name):
    normalized_first_name = normalize_name(first_name)
    normalized_last_name = normalize_name(last_name)
    normalized_full_name = f"{normalized_first_name} {normalized_last_name}"

    all_players = players.get_players()
    static_matches = [
        player
        for player in all_players
            if normalize_name(player["full_name"]) == normalized_full_name

    ]
    print("Static matches:", static_matches)
    if static_matches:
        active_player = next(
        (player for player in static_matches if player["is_active"]),
        static_matches[0]
    )
    return active_player["id"]

    current_season = "2025-26"
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
    first_name = request.args.get('firstName')
    last_name = request.args.get('lastName')

    if not first_name or not last_name:
        return jsonify({"error": "Missing firstName or lastName"}), 400

    # Normalize names
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
    # Cache hit
    if key in cache:
        print("Cache hit for:", key)
        return jsonify(cache[key])

    print("Searching for:", first_name, last_name)
    player_id = get_player_id(first_name, last_name)

    if not player_id:
        return jsonify({"error": "Player not found"}), 404

    retries = 2
    retry_delay = 1

    for attempt in range(retries):
        try:
            career = playercareerstats.PlayerCareerStats(
                player_id=player_id,
                timeout=10
            )

            data = career.get_data_frames()
            if not data or len(data) == 0:
                return jsonify({"error": "No stats found"}), 404

            stats = data[0].to_dict(orient='records')

            # ✅ Cache AFTER success
            cache[key] = stats

            print("Fetched + cached:", key)
            return jsonify(stats)

        except Exception as e:
            print(f"Error (attempt {attempt + 1}):", e)
            if attempt < retries - 1:
                time.sleep(retry_delay)

    return jsonify({"error": "Failed to fetch player stats"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)