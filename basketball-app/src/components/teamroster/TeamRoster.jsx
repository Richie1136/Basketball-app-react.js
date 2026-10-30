import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './TeamRoster.css'
import Loading from '../loading/Loading'
import { useParams, Link } from 'react-router-dom'
import { prefixedUrl } from '../../utils/prefixUrl'

const TeamRoster = () => {
  const [roster, setRoster] = useState(null)
  const [error, setError] = useState(null)

  const { team } = useParams()

  useEffect(() => {
    const rosterData = async () => {
      try {
        setError(null)
        setRoster(null)
        const response = await fetch(`${prefixedUrl}/team_roster?team=${team}`)
        if (!response.ok) {
          throw new Error("Unable to load Team Roster data")
        }
        const rosterInfo = await response.json()
        if (!Array.isArray(rosterInfo)) {
          throw new Error("Invalid team roster response")
        }
        setRoster(rosterInfo)
      } catch (error) {
        console.log(error)
        setError("Team roster is not available")
      }
    }
    rosterData()
  }, [team])

  if (error) return <p>{error}</p>

  if (!roster) return <Loading />

  const active = roster?.filter((player) => player.Status === 'Active').sort((a, b) => a.Jersey - b.Jersey)

  const positionMap = {
    PG: 'Point Guard',
    SG: 'Shooting Guard',
    SF: 'Small Forward',
    PF: 'Power Forward',
    C: 'Center'
  }

  const teamMap = {
    ATL: 'Atlanta Hawks',
    BKN: 'Brooklyn Nets',
    BOS: 'Boston Celtics',
    CHA: 'Charlotte Hornets',
    CHI: 'Chicago Bulls',
    CLE: 'Cleveland Cavaliers',
    DAL: 'Dallas Mavericks',
    DEN: 'Denver Nuggets',
    DET: 'Detroit Pistons',
    GS: 'Golden State Warriors',
    HOU: 'Houston Rockets',
    IND: 'Indiana Pacers',
    LAC: 'Los Angeles Clippers',
    LAL: 'Los Angeles Lakers',
    MEM: 'Memphis Grizzlies',
    MIA: 'Miami Heat',
    MIL: 'Milwaukee Bucks',
    MIN: 'Minnesota Timberwolves',
    NO: 'New Orleans Pelicans',
    NY: 'New York Knicks',
    OKC: 'Oklahoma City Thunder',
    ORL: 'Orlando Magic',
    PHI: 'Philadelphia 76ers',
    PHO: 'Phoenix Suns',
    POR: 'Portland Trail Blazers',
    SA: 'San Antonio Spurs',
    SAC: 'Sacramento Kings',
    TOR: 'Toronto Raptors',
    UTA: 'Utah Jazz',
    WAS: 'Washington Wizards'
  }

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>{teamMap[team] || team} Active Roster</h1>
      </div>
      <div className='team-container'>
        {active?.map(({ Jersey, FirstName, LastName, PlayerID, Position }) => {
          return (
            <Link to={`/player/${PlayerID}`} key={PlayerID} className='card-link'>
              <Card>
                <h2>{FirstName} {LastName}</h2>
                <p className='jersey-number'>{Jersey !== null && `#${Jersey}`}</p>
                <p className='position'>{positionMap[Position] || Position}</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TeamRoster