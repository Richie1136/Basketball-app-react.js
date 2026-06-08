# NBA Basketball Stats App

A full-stack NBA statistics application built with React and Python/Flask that provides player statistics, team information, standings, and career data using the nba_api package and custom data transformation logic.

## Features

### Player Statistics

* Retrieves player career statistics using nba_api
* Displays season-by-season performance data
* Calculates career totals and averages
* Handles traded-player seasons and team history
* Displays player photos and biographical information
* Supports player name normalization for accented characters and special naming conventions
* Implements custom data transformation and sorting logic for season statistics, career totals, and multi-team seasons

### League Information

* NBA team directory
* Conference and division filtering
* Current league standings
* Team details and records

### Performance Optimizations

* Backend caching for faster responses
* Frontend session storage caching
* Efficient API data transformations

## Tech Stack

### Frontend

* React
* React Router
* JavaScript
* CSS

### Backend

* Python
* Flask
* Flask-CORS
* nba_api

### Deployment

* Vercel (Frontend)
* Render (Backend)

## Key Features Implemented

* Implemented player name normalization to support accented characters and special naming conventions.
* Developed custom data transformation and aggregation logic for career statistics and multi-team seasons.
* Built backend caching to improve API performance and reduce redundant requests.
* Implemented dynamic conference and division filtering for NBA teams.
* Developed dynamic standings pages using React and React Router.
* Designed a responsive user interface for desktop and mobile devices.


## Project Structure

```text
src/
├── api/
├── components/
├── utils/
├── App.jsx
├── index.css
└── index.jsx


backend/
├── venv/
├── database.py
├── fetch_stats.py
├── nba.db
├── requirements.txt
└── server.py
```

## Local Development

### Frontend

```bash

npm install
npm start
```

### Backend

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python3 server.py
```

## Live Demo

Frontend:
https://basketball-app-react-js.vercel.app

Backend:
https://basketball-app-backend.onrender.com 

## API Endpoints

### Get Player Statistics

```http
GET /api/player_stats?firstName={firstName}&lastName={lastName}
```

#### Example

```http
GET /api/player_stats?firstName=LeBron&lastName=James
```

#### Response

Returns player career statistics including:

- Season information
- Team history
- Games played
- Points per game
- Rebounds per game
- Assists per game
- Additional career statistics


GitHub: https://github.com/Richie1136
LinkedIn: https://www.linkedin.com/in/richardthagenah
