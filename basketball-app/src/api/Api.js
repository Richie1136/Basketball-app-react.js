// API Routes used in this application

// API endpoint used to get all of the nba teams, including City, Conference, Division, Name,
// Colors and logo

//`${baseurL}/teams?key=${APIKEY}`

// API endpoint used to get information about each player, including Birthplace (City, State),
// School (High School or College), Height, Weight, Age, Experience, Salary, Position, Number,
// Photo and Team

// `${baseurL}/Player/${playerid}?key=${APIKEY}`

// Endpoint to get the NBA standings, includes the Team name which when clicked on 
// will send you to the team roster component, Wins, Losses, Win percentage, Games Back,
// Conference and Division record, Points per game, Opponent Points per game,
// Point differental, Home and Road Record, Record in last ten games and current 
// streak (win or losing)

// `${baseurL}/Standings/2023?key=${APIKEY}`

// Base Url that every endpoint starts with

export const baseurL = "https://api.sportsdata.io/v3/nba/scores/json"
