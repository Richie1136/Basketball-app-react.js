import { useEffect, useState } from 'react'
import PlayerInfo from '../playerInfo/PlayerInfo'
import Loading from '../loading/Loading'
import { grabPlayerStats } from '../../utils/grabPlayerStats'
import { getBasketballReferenceId } from '../../utils/playerPhotoUtils'
import { prefixedUrl } from '../../utils/prefixUrl'

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

  const careerStats = grabPlayerStats(playerStats ?? [])

  const { totalAssists, totalBlocks, careerFgPercent, careerFtPercent, careerThreePercent, totalFouls, careerGames, minutes, totalPoints, totalRebounds, totalSteals, totalTurnovers } = careerStats ?? {}

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
            const statsArray = backendData.seasonStats ?? backendData
            return statsArray
              .map(stat => {
                const seasonId = stat.SEASON_ID ?? stat.year_id
                let season = null
                if (seasonId) {
                  const seasonParts = seasonId.split('-')
                  if (seasonParts?.length === 2) {
                    const startYear = parseInt(seasonParts[0])
                    season = startYear + 1
                  } else {
                    season = parseInt(seasonId) || null
                  }
                }
                if (filterSeason !== null && season !== filterSeason) {
                  return null
                }
                const games = Number(stat.GP ?? stat.games ?? 0)
                const isBasketballReference = Boolean(stat.year_id)
                return {
                  season,
                  team: stat.TEAM_ABBREVIATION || stat.team_name_abbr || '',
                  games,

                  minutesPg: isBasketballReference ? Number(stat.mp_per_g ?? 0) * games : Number(stat.MIN ?? 0),

                  points: isBasketballReference
                    ? Number(stat.pts_per_g ?? 0) * games
                    : Number(stat.PTS ?? 0),

                  totalRb: isBasketballReference
                    ? Number(stat.trb_per_g ?? 0) * games
                    : Number(stat.REB ?? 0),

                  assists: isBasketballReference
                    ? Number(stat.ast_per_g ?? 0) * games
                    : Number(stat.AST ?? 0),

                  steals: isBasketballReference
                    ? Number(stat.stl_per_g ?? 0) * games
                    : Number(stat.STL ?? 0),

                  blocks: isBasketballReference
                    ? Number(stat.blk_per_g ?? 0) * games
                    : Number(stat.BLK ?? 0),

                  turnovers: isBasketballReference
                    ? Number(stat.tov_per_g ?? 0) * games
                    : Number(stat.TOV ?? 0),

                  personalFouls: isBasketballReference
                    ? Number(stat.pf_per_g ?? 0) * games
                    : Number(stat.PF ?? 0),

                  fieldGoals: isBasketballReference
                    ? Number(stat.fg_per_g ?? 0) * games
                    : Number(stat.FGM ?? 0),

                  fieldAttempts: isBasketballReference
                    ? Number(stat.fga_per_g ?? 0) * games
                    : Number(stat.FGA ?? 0),
                  fieldPercent: isBasketballReference ? Number(stat.fg_pct ?? 0) : Number(stat.FG_PCT ?? 0),

                  ft: isBasketballReference
                    ? Number(stat.ft_per_g ?? 0) * games
                    : Number(stat.FTM ?? 0),

                  ftAttempts: isBasketballReference
                    ? Number(stat.fta_per_g ?? 0) * games
                    : Number(stat.FTA ?? 0),

                  ftPercent: isBasketballReference ? Number(stat.ft_pct ?? 0) : Number(stat.FT_PCT ?? 0),

                  threeFg: isBasketballReference
                    ? Number(stat.fg3_per_g ?? 0) * games
                    : Number(stat.FG3M ?? 0),

                  threeAttempts: isBasketballReference
                    ? Number(stat.fg3a_per_g ?? 0) * games
                    : Number(stat.FG3A ?? 0),

                  threePercent: isBasketballReference ? Number(stat.fg3_pct ?? 0) : Number(stat.FG3_PCT ?? 0)
                }
              })
              .filter(stat => stat !== null)
          }

          const basketballReferenceId = getBasketballReferenceId(data.FirstName, lastNameGreaterThanOne)

          try {
            const backendResponse = await fetch(`${prefixedUrl}/player_stats?firstName=${encodeURIComponent(data.FirstName === 'Nicolas' && data.LastName === 'Claxton' ? 'Nic' : data.FirstName)}
            &lastName=${encodeURIComponent(lastNameGreaterThanOne)}&bbrefId=${encodeURIComponent(basketballReferenceId)}`)
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
  }, [data?.FirstName, data?.LastName, prefixedUrl])

  // Sort the stats so that "TOT" or "2TM" entries appear first for each season, followed by other teams.
  // If player got traded, in the offseason so for example end of 2024 season into 2025 season, then 
  // the last team before TOT in 2024 season should be old team and new team should be first in 2025 season

  const getPrevSeasonTeams = (stats, season) => {
    return stats
      .filter(s => s.season === season - 1 && s.team !== "TOT" && s.team !== "2TM")
      .map(s => s.team);
  }

  const sortedStats = [...(playerStats || [])].sort((a, b) => {
    // Different seasons: newest first
    if (a.season !== b.season) return b.season - a.season; // Sorted newest to oldest

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
    const prevTeams = getPrevSeasonTeams(playerStats || [], a.season);
    const aIsPrev = prevTeams.includes(a.team);
    const bIsPrev = prevTeams.includes(b.team);

    // Push previous-season team(s) to the end
    if (aIsPrev && !bIsPrev) return 1; // A pushes to bottom
    if (!aIsPrev && bIsPrev) return -1; // B pushes to bottom
    return 0;
  });

  const grabSeasons = (playerStats ?? []).map(stat => stat.season);

  const convertToSet = new Set(grabSeasons);
  const uniqueSeasons = Array.from(convertToSet);

  return (
    <div>
      {!hasFetched ? (
        <Loading />
      ) : playerStats === null || playerStats.length === 0 ? (
        <h4>No Player Stats</h4>
      ) : (
        <PlayerInfo data={sortedStats} games={careerGames} minutes={minutes} points={totalPoints} rebounds={totalRebounds} assists={totalAssists} steals={totalSteals} blocks={totalBlocks} fieldGoal={careerFgPercent} threePoint={careerThreePercent} freeThrow={careerFtPercent} turnovers={totalTurnovers} fouls={totalFouls} seasons={uniqueSeasons} />
      )}
    </div>
  )
}

export default PlayerStats