import { useEffect, useState } from 'react'
import PlayerInfo from '../playerInfo/PlayerInfo'

const PlayerStats = ({ data }) => {
  const [playerStats, setPlayerStats] = useState()

  useEffect(() => {
    const playerStatsInfo = async () => {
      try {
        if (data && data.FirstName && data.LastName) {
          const playerName = `${data.FirstName} ${data.LastName}`
          const statsResponse = await fetch(`http://rest.nbaapi.com/api/PlayerDataTotals/name/${playerName}`)
          const statsData = await statsResponse.json()
          setPlayerStats(statsData)
        }
      } catch (error) {
        console.log(error)
      }
    }
    playerStatsInfo()
  }, [])

  let sortedStats = playerStats?.sort((a, b) => {
    return b.season - a.season
  })

  return (
    <div>
      <PlayerInfo data={sortedStats} />
    </div>
  )
}

export default PlayerStats