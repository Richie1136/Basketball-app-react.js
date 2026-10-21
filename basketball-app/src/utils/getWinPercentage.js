export const getWinPercentage = (team) => {
    const wins = Number(team.Wins)
    const games = wins + Number(team.Losses)

    return games > 0 ? wins / games : 0
}