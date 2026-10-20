import { useState, useEffect } from 'react'
import './Standings.css'
import { Row, Loading } from '../index'
import { useParams, useNavigate } from 'react-router-dom'
import { prefixedUrl } from '../../utils/prefixUrl'

const today = new Date()

const currentYear = today.getFullYear()

const latestSeason = today.getMonth() >= 9 ? currentYear + 1 : currentYear

const allowedSeasons = Array.from(
  { length: latestSeason - 2025 + 1 },
  (_, index) => String(latestSeason - index)
)

const Standings = () => {

  const [standings, setStandings] = useState()
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { season } = useParams()

  const selectedSeason = season || String(latestSeason)

  useEffect(() => {
    const getStandings = async () => {
      if (!allowedSeasons.includes(selectedSeason)) {
        setStandings(undefined)
        setError("Standings Year is Not allowed")
        return
      }
      try {
        setError(null)
        setStandings(undefined)
        const response = await fetch(`${prefixedUrl}/standings?season=${selectedSeason}`)
        if (!response.ok) {
          throw new Error("Unable to load Standings data")
        }
        const data = await response.json()
        setStandings(data)
      } catch (error) {
        console.log(error)
        setError("Standings are not available for this season.")
      }
    }
    getStandings()
  }, [selectedSeason])

  if (error) return <p>{error}</p>

  if (!standings) return <Loading />


  const Eastern = standings?.filter((east) => east.Conference === 'Eastern').sort((a, b) => b.Percentage - a.Percentage)
  const Western = standings?.filter((west) => west.Conference === 'Western').sort((a, b) => b.Percentage - a.Percentage)

  const easternTeams = Eastern?.map((o, i) => ({ ...o, rank: i + 1 }))

  const westernTeams = Western?.map((o, i) => ({ ...o, rank: i + 1 }))

  const handleChange = (e) => {
    const selectedSeason = e.target.value
    navigate('/standings/' + selectedSeason)
  }

  const headers = [
    "W", "L", "WIN%", "GB", "CONF", "DIV",
    "PPG", "OPP PPG", "DIFF", "Home", "Road", "Last10", "STREAK"
  ].map((header) => (
    <th key={header} scope='col'>
      {header}
    </th>
  ))

  return (
    <>
      <div className='background-container'>
        <div className="season-select-wrap">
          <label className="season-label" htmlFor="season">Season:</label>
          <select id="season" className='season-select' value={selectedSeason} onChange={handleChange}>
            {allowedSeasons?.map((year) => (
              <option key={year} value={year}>
                {Number(year) - 1}-{year.slice(-2)}
              </option>
            ))}
          </select>
        </div>
        <div className='standings-layout'>
          <div className='conference-standings'>
            <h2 className='conference-title'>Eastern Conference</h2>
            <table>
              <tbody>
                <tr>
                  <th scope='col'>
                    TEAM
                  </th>
                  {headers}
                </tr>
                {easternTeams?.map((team) => (
                  <Row key={team.Key} {...team} />
                ))}
              </tbody>
            </table>
          </div>
          <div className='conference-standings'>
            <h2 className='conference-title'>Western Conference</h2>
            <table>
              <tbody>
                <tr>
                  <th scope='col'>TEAM</th>
                  {headers}
                </tr>
                {westernTeams?.map((team) => (
                  <Row key={team.Key} {...team} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )

}

export default Standings