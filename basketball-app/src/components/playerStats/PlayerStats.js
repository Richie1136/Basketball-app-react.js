import { useEffect, useState } from 'react'
import PlayerInfo from '../playerInfo/PlayerInfo'
import Loading from '../loading/Loading'

// Cache for player stats - stores data by player name
const statsCache = new Map()


// Helper functions for sessionStorage cache (persists across page reloads)
const getCachedStats = (cacheKey) => {
  if (typeof window === 'undefined') return null
  try {
    const cached = sessionStorage.getItem(`playerStats_${cacheKey}`)
    if (cached) {
      return JSON.parse(cached)
    }
  } catch (error) {
    console.log('Error reading from sessionStorage:', error)
  }
  return null
}

const setCachedStats = (cacheKey, stats) => {
  try {
    sessionStorage.setItem(`playerStats_${cacheKey}`, JSON.stringify(stats))
  } catch (error) {
    console.log('Error writing to sessionStorage:', error)
  }
}

const PlayerStats = ({ data }) => {
  const [playerStats, setPlayerStats] = useState(null)
  const [hasFetched, setHasFetched] = useState(false)

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const playerStatsInfo = async () => {
      try {
        if (data.FirstName && data.LastName) {
          const lastNameGreaterThanOne = data.LastName === 'Martin Jr.' ? data.LastName.split(" ")[0] : data.LastName
          const cacheKey = `${data.FirstName}_${lastNameGreaterThanOne}`
          let statsData = []

          const cachedStats = statsCache.get(cacheKey) || getCachedStats(cacheKey)
          if (cachedStats) {
            statsCache.set(cacheKey, cachedStats)
            setPlayerStats(cachedStats)
            return
          }

          const transformBackendData = (backendData, filterSeason = null) => {
            return backendData
              .map(stat => {
                let season = null
                if (stat.SEASON_ID) {
                  const seasonParts = stat.SEASON_ID.split('-')
                  if (seasonParts?.length === 2) {
                    const startYear = parseInt(seasonParts[0])
                    season = startYear + 1
                  } else {
                    season = parseInt(stat.SEASON_ID) || null
                  }
                }
                if (filterSeason !== null && season !== filterSeason) {
                  return null
                }
                return {
                  season: season,
                  team: stat.TEAM_ABBREVIATION || '',
                  games: stat.GP || 0,
                  minutesPg: stat.MIN || 0,
                  points: stat.PTS || 0,
                  totalRb: stat.REB || 0,
                  assists: stat.AST || 0,
                  steals: stat.STL || 0,
                  blocks: stat.BLK || 0,
                  turnovers: stat.TOV || 0,
                  personalFouls: stat.PF || 0,
                  fieldGoals: stat.FGM || 0,
                  fieldAttempts: stat.FGA || 0,
                  fieldPercent: stat.FG_PCT || 0,
                  ft: stat.FTM || 0,
                  ftAttempts: stat.FTA || 0,
                  ftPercent: stat.FT_PCT || 0,
                  threeFg: stat.FG3M || 0,
                  threeAttempts: stat.FG3A || 0,
                  threePercent: stat.FG3_PCT || 0
                }
              })
              .filter(stat => stat !== null)
          }
          try {
            const backendResponse = await fetch(`${API_BASE_URL}/api/player_stats?firstName=${encodeURIComponent(data.FirstName === 'Nicolas' && data.LastName === 'Claxton' ? 'Nic' : data.FirstName)}&lastName=${encodeURIComponent(lastNameGreaterThanOne)}`)
            if (backendResponse.ok) {
              const backendData = await backendResponse.json()
              statsData = transformBackendData(backendData)
            } else {
              statsData = null
            }
          } catch (backendError) {
            console.log('Backend fetch failed:', backendError)
            statsData = null
          }
          const finalStats = statsData && Array.isArray(statsData) && statsData?.length > 0 ? statsData : null

          if (finalStats) {
            statsCache.set(cacheKey, finalStats) // cacheKey is the player name
            setCachedStats(cacheKey, finalStats)
          }
          setPlayerStats(finalStats)
        } else {
          setPlayerStats(null)
        }
      } catch (error) {
        console.error('Error fetching player stats:', error)
        setPlayerStats(null)
      } finally {
        setHasFetched(true)
      }
    }
    playerStatsInfo()
  }, [data?.FirstName, data?.LastName])


  let minutes = 0
  let games2 = 0
  let totalPoints = 0
  let totalRebounds = 0
  let totalAssists = 0
  let totalSteals = 0
  let totalBlocks = 0
  let totalTurnovers = 0
  let totalFouls = 0
  let careerFgPercent = 0
  let careerFtPercent = 0
  let careerThreePercent = 0
  let totalFieldGoalsMade = 0
  let totalFieldGoalsAttempted = 0
  let totalFtMake = 0
  let totalFtAttempted = 0
  let total3PointMade = 0
  let total3PointAttempted = 0

  for (let i = 0; i < playerStats?.length; i++) {
    const stats = playerStats[i];
    if (playerStats[i]?.team !== 'TOT') {
      const { minutesPg, games, points, fieldGoals, fieldAttempts, ft, ftAttempts, threeFg, threeAttempts, totalRb, assists, steals,
        blocks, turnovers, personalFouls, threePercent
      } = stats
      // Adding secondary check just in case for some reason we have the stats component showing up but a certain stat we dont have a value for
      minutes += minutesPg ?? 0;
      games2 += games ?? 0;
      totalPoints += points ?? 0;
      totalFieldGoalsMade += fieldGoals ?? 0;
      totalFieldGoalsAttempted += fieldAttempts ?? 0;
      totalFtMake += ft ?? 0
      totalFtAttempted += ftAttempts ?? 0
      total3PointMade += threeFg ?? 0
      total3PointAttempted += threeAttempts ?? 0
      totalRebounds += totalRb ?? 0;
      totalAssists += assists ?? 0;
      totalSteals += steals ?? 0;
      totalBlocks += blocks ?? 0;
      totalTurnovers += turnovers ?? 0;
      totalFouls += personalFouls ?? 0;
      careerThreePercent += threePercent ?? 0
    }
  }

  // Grabbing the career shooting stats for player
  // Just make sure we get a value
  careerFgPercent = totalFieldGoalsAttempted > 0 ? totalFieldGoalsMade / totalFieldGoalsAttempted : 0;
  careerFtPercent = totalFtAttempted > 0 ? totalFtMake / totalFtAttempted : 0;
  careerThreePercent = total3PointAttempted > 0 ? total3PointMade / total3PointAttempted : 0

  // Sort the stats so that "TOT" or "2TM" entries appear first for each season, followed by other teams.
  // If player got traded, in the offseason so for examole end of 2024 season into 2025 season, then 
  // the last team before TOT in 2024 season should be old team and new team should be first in 2025 season

  const getPrevSeasonTeams = (stats, season) => {
    return stats
      .filter(s => s.season === season - 1 && s.team !== "TOT" && s.team !== "2TM")
      .map(s => s.team);
  }

  const sortedStats = playerStats?.sort((a, b) => {
    // Different seasons: newest first
    if (a.season !== b.season) return b.season - a.season; // Sorted newest to oldest

    // Same season:
    // || a.team === "2TM" if find player who has 2TM then add it back to the conditional
    // || b.team === "2TM" if find player who has 2TM then add it back to the conditional
    const aIsTot = a.team === "TOT";
    const bIsTot = b.team === "TOT";
    const currentTeam = data?.Team;

    // TOT always first
    if (aIsTot && !bIsTot) return -1;
    if (!aIsTot && bIsTot) return 1;

    // Current team should be shown before any other non-TOT team
    if (currentTeam) {
      const aIsCurrentTeam = a.team === currentTeam;
      const bIsCurrentTeam = b.team === currentTeam;
      if (aIsCurrentTeam && !bIsCurrentTeam) return -1;
      if (!aIsCurrentTeam && bIsCurrentTeam) return 1;
    }

    // Find previous season teams
    const prevTeams = getPrevSeasonTeams(playerStats, a.season);
    const aIsPrev = prevTeams.includes(a.team);
    const bIsPrev = prevTeams.includes(b.team);

    // Push previous-season team(s) to the end
    if (aIsPrev && !bIsPrev) return 1; // A pushes to bottom
    if (!aIsPrev && bIsPrev) return -1; // B pushes to bottom
    return 0;
  });

  const totalGames = playerStats?.reduce((sum, stat) => sum + (stat.games ?? 0), 0);
  const grabSeasons = playerStats?.map(stat => stat.season);

  const convertToSet = new Set(grabSeasons);
  const uniqueSeasons = Array.from(convertToSet);

  return (
    <div>
      {!hasFetched ? (
        <Loading />
      ) : playerStats === null || playerStats.length === 0 ? (
        <h4>No Player Stats</h4>
      ) : (
        <PlayerInfo data={sortedStats} games={games2} minutes={minutes} points={totalPoints} rebounds={totalRebounds} assists={totalAssists} steals={totalSteals} blocks={totalBlocks} fieldGoal={careerFgPercent} threePoint={careerThreePercent} freeThrow={careerFtPercent} turnovers={totalTurnovers} fouls={totalFouls} gamesPlayed={totalGames} seasons={uniqueSeasons} />
      )}
    </div>
  )
}

export default PlayerStats