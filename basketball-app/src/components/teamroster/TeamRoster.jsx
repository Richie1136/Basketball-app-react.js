import { baseUrl } from '../../api/Api'
import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './TeamRoster.css'
import Loading from '../loading/Loading'
import { useParams, Link } from 'react-router-dom'

const TeamRoster = () => {
  const [roster, setRoster] = useState()

  const APIKEY = import.meta.env.VITE_APP_API_KEY

  const params = useParams()

  const obj = new URLSearchParams(params);
  const term = obj.get('team')

  const result = `${baseUrl}/Players/${term}?key=${APIKEY}`


  useEffect(() => {
    const rosterData = async () => {
      try {
        const response = await fetch(result)
        let rosterInfo = await response.json()
        setRoster(rosterInfo)
      } catch (error) {
        console.log(error)
      }
    }
    rosterData()
  }, [result])

  const active = roster?.filter((status) => status.Status === 'Active').sort((a, b) => a.Jersey - b.Jersey)

  if (!roster) return <Loading />

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
    SAC: 'Sacremento Kings',
    TOR: 'Toronto Raptors',
    UTA: 'Utah Jazz',
    WAS: 'Washington Wizards'
  }

  return (
    <div className="roster-page">
      <div className="roster-header">
        <h1>{teamMap[term] || term} Active Roster</h1>
      </div>
      <div className='team-container'>
        {active?.map(({ Jersey, FirstName, LastName, PlayerID, Position }) => {
          return (
            <Link to={`/player/${PlayerID}`} key={PlayerID} className='card-link'>
              <Card>
                <h2>{FirstName} {LastName}</h2>
                <p className='jersey-number'>#{Jersey}</p>
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