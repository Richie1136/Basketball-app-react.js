// API Routes used in this application

// API endpoint used to get all of the nba teams, including City, Conference, Division, Name,
// Colors and logo, also gives you the ability to filter teams based on conference and division

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

// Endpoint to get Nba teams active roster, to get to this endpoint you click either the League or 
// Standings on the navbar and then click on the team name. The Team Rsoter endpoint
// gives you a photo of the player along with the players name, number and position.

// `${baseurL}/Players/${term}?key=${APIKEY}`

// Base Url that every endpoint starts with

export const baseurL = "https://api.sportsdata.io/v3/nba/scores/json"