import sqlite3

conn = sqlite3.connect("nba.db")
c = conn.cursor()

c.execute("""
CREATE TABLE IF NOT EXISTS player_stats (
    player_id INTEGER PRIMARY KEY,
    full_name TEXT,
    stats TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()
conn.close()