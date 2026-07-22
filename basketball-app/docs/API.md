# Basketball App API Reference

## Architecture

The Basketball App uses a Flask backend as a proxy between the React frontend and the SportsData.io API.

The React frontend never communicates directly with SportsData.io. Instead, it sends requests to the Flask backend, which securely communicates with SportsData.io using an API key stored in backend environment variables.

```text
React Frontend → Flask Backend → SportsData.io
```

This architecture provides several benefits:

- Keeps the SportsData.io API key hidden from the browser.
- Centralizes all external API requests in one location.
- Makes it easier to add caching, logging, and error handling.
- Allows the frontend to remain independent of the external API.

---

# API Endpoints

## Teams

### SportsData.io Endpoint

```http
GET /v3/nba/scores/json/teams
```

### Backend Endpoint

```http
GET /api/teams
```

### Purpose

Returns all NBA teams displayed on the League page.

The League page uses this endpoint to:

- Browse all NBA teams
- Search for teams by city or team name
- Filter teams by conference
- Filter teams by division
- Display each team's current record and conference rank
- Select a team to view its active roster

### Response Data

- City
- Team name
- Conference
- Team colors
- Team logo
- Head coach

---

## Player Information

### SportsData.io Endpoint

```http
GET /v3/nba/scores/json/Player/{playerId}
```

### Backend Endpoint

```http
GET /api/player_info?playerId={playerId}
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `playerId` | SportsData.io player ID |

### Purpose

Returns detailed information about a selected player for the Player Details page.

### Response Data

- Birthplace
- School
- Height
- Weight
- Age
- Experience
- Salary
- Position
- Jersey number
- Team
- Player photo

---

## Standings

### SportsData.io Endpoint

```http
GET /v3/nba/scores/json/Standings/{season}
```

### Backend Endpoint

```http
GET /api/standings?season={season}
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `season` | NBA season (Example: `2026`) |

### Purpose

Returns the NBA standings for the selected season.

This endpoint is used by:

- The Standings page
- The League page to display each team's:
  - Wins
  - Losses
  - Conference rank

### Response Data

- Team name
- Wins
- Losses
- Win percentage
- Games behind
- Conference rank
- Division record
- Points per game
- Opponent points per game
- Point differential
- Home record
- Road record
- Last 10 games
- Current winning or losing streak

---

## Team Roster

### SportsData.io Endpoint

```http
GET /v3/nba/scores/json/Players/{team}
```

### Backend Endpoint

```http
GET /api/team_roster?team={team}
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `team` | NBA team abbreviation (Example: `BOS`, `LAL`, `NY`) |

### Purpose

Returns the active roster for a selected NBA team.

Users reach this endpoint by selecting a team from either:

- The League page
- The Standings page

### Response Data

- Player name
- Player photo
- Jersey number
- Position
- Team

---

# Security

The React frontend never communicates directly with SportsData.io.

Only the Flask backend has access to the SportsData.io API key.

The frontend only sends public information such as:

- Player IDs
- Team abbreviations
- Seasons

The backend is responsible for:

- Calling SportsData.io
- Authenticating requests
- Returning the API response to the frontend

This architecture prevents the API key from being exposed in the browser while keeping the frontend independent of the external API.