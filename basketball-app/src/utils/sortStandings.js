import { getWinPercentage } from "./getWinPercentage"

// Sort by win percentage, then use point differential to break ties.
// This is a simplified display order, not the full NBA tiebreaker system.

export const sortStandings = (a, b) => {
    const getSortPercentage = (team) => {
        const games = Number(team.Wins) + Number(team.Losses)

        // Use 0.5 only for sorting teams that haven't played yet.
        // This places 0–0 teams between teams with winning and losing records.
        // Their displayed WIN% remains unchanged.

        return games === 0 ? 0.5 : getWinPercentage(team)
    }
    // Higher win percentages appear first.
    const percentageDifference = getSortPercentage(b) - getSortPercentage(a)

    if (percentageDifference !== 0) {
        return percentageDifference
    }

    // When win percentages match, put teams with more wins first.

    const winDifference = Number(b.Wins) - Number(a.Wins)

    if (winDifference !== 0) {
        return winDifference
    }

    // If percentages are equal, compare points scored minus points allowed.
    const aDiff = Number(a.PointsPerGameFor) - Number(a.PointsPerGameAgainst)
    const bDiff = Number(b.PointsPerGameFor) - Number(b.PointsPerGameAgainst)

    // Higher point differentials appear first.
    return bDiff - aDiff
}