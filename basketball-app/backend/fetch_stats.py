import sqlite3
import json
import time
from datetime import datetime, timedelta

from nba_api.stats.static import players
from nba_api.stats.endpoints import (
    playercareerstats,
    scoreboardv2,
    boxscoretraditionalv2
)

# -----------------------------
# DB SETUP
# -----------------------------
conn = sqlite3.connect("nba.db")
c = conn.cursor()

active_players = players.get_active_players()

# -----------------------------
# GET YESTERDAY GAMES
# -----------------------------
played_players = set()

yesterday = (datetime.now() - timedelta(days=1)).strftime("%m/%d/%Y")

board = scoreboardv2.ScoreboardV2(game_date=yesterday)
games = board.get_data_frames()[0]

if not games.empty:
    game_ids = games["GAME_ID"].tolist()

    for game_id in game_ids:
        try:
            box = boxscoretraditionalv2.BoxScoreTraditionalV2(game_id=game_id)
            df = box.get_data_frames()[0]

            for _, row in df.iterrows():
                # Only count players who actually played
                if row["MIN"] and row["MIN"] != "0:00":
                    played_players.add(row["PLAYER_ID"])

        except Exception as e:
            print("Box score error:", game_id, e)

# -----------------------------
# UPDATE DATABASE
# -----------------------------
updated_players = 0

for player in active_players:

    try:
        player_id = player["id"]

        # 🔥 SKIP if they did NOT play yesterday
        if player_id not in played_players:
            continue

        # 🔥 SKIP if already in DB (optional optimization)
        c.execute(
            "SELECT 1 FROM player_stats WHERE player_id = ?",
            (player_id,)
        )

        if c.fetchone():
            print("Skipping (already exists):", player["full_name"])
            continue

        career = playercareerstats.PlayerCareerStats(
            player_id=player_id,
            timeout=10
        )

        data = career.get_data_frames()

        if not data or len(data) == 0:
            print("No data:", player["full_name"])
            continue

        stats = data[0].to_dict(orient="records")

        c.execute("""
            INSERT OR REPLACE INTO player_stats
            (player_id, full_name, stats, last_updated)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        """, (
            player_id,
            player["full_name"],
            json.dumps(stats)
        ))

        updated_players += 1

        if updated_players % 10 == 0:
            conn.commit()

        time.sleep(1.2)  # safer for NBA API

    except Exception as e:
        print("Failed:", player["full_name"], e)

conn.commit()
conn.close()

print("Done. Updated players:", updated_players)