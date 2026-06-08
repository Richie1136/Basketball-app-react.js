import { baseUrl } from '../../api/Api'
import { useState, useEffect } from 'react'
import './Standings.css'
import { Row, Loading } from '../index'
import { useParams, useNavigate } from 'react-router-dom'

const allowedSeasons = ["2026", "2025"]

const Standings = () => {

  const [getStandings, setGetStadings] = useState()

  const APIKEY = import.meta.env.VITE_APP_API_KEY
  const navigate = useNavigate()
  const { season } = useParams()

  const selectedSeason = season || "2026"

  const result = `${baseUrl}/Standings/${selectedSeason}?key=${APIKEY}`

  useEffect(() => {
    const getStandings = async () => {
      if (!allowedSeasons.includes(selectedSeason)) {
        return
      }
      try {
        const data = await fetch(result)
        const response = await data.json()
        setGetStadings(response)
      } catch (error) {
        console.log(error)
      }
    }
    getStandings()
  }, [result, selectedSeason])

  if (!getStandings) return <Loading />

  const Eastern = getStandings?.filter((east) => east.Conference === 'Eastern').sort((a, b) => b.Percentage - a.Percentage)
  const Western = getStandings?.filter((west) => west.Conference === 'Western').sort((a, b) => b.Percentage - a.Percentage)
  let number = 0

  let ranks = Eastern?.map(() => (
    number += 1
  ))

  const EasternTeams = Eastern?.map((o, i) => ({ ...o, rank: ranks[i] }))

  const WesternTeams = Western?.map((o, i) => ({ ...o, rank: ranks[i] }))

  const handleChange = (e) => {
    const selectedSeason = e.target.value
    navigate('/standings/' + selectedSeason)
  }

  const headers = (
    <>
      <th className='wins'>
        <span className='divisionspan'>
          <span className='teamw'>W</span>
        </span>
      </th>
      <th className='losses'>
        <span className='team'>
          <span className='teaml'>L</span>
        </span>
      </th>
      <th className='pct'>
        <span className='runs'>
          <span style={{ marginLeft: '20px' }}>WIN%</span>
        </span>
      </th>
      <th className='gb'>
        <span className='runs'>
          <span>GB</span>
        </span>
      </th>
      <th className='conf'>
        <span className='runs'>
          <span>CONF</span>
        </span>
      </th>
      <th className='div'>
        <span className='runs'>
          <span>DIV</span>
        </span>
      </th>
      <th className='div'>
        <span className='runs'>
          <span style={{ textAlign: 'center', marginLeft: '10px' }}>PPG</span>
        </span>
      </th>
      <th className='div'>
        <span className='runs'>
          <span>OPP PPG</span>
        </span>
      </th>
      <th className='div'>
        <span className='runs'>
          <span>DIFF</span>
        </span>
      </th>
      <th className='home'>
        <span className='runs'>
          <span>Home</span>
        </span>
      </th>
      <th className='home'>
        <span className='runs'>
          <span>Road</span>
        </span>
      </th>
      <th className='last10'>
        <span className='runs'>
          <span>LAST10</span>
        </span>
      </th>
      <th className='streak'>
        <span className='tstreak'>
          <span>STREAK</span>
        </span>
      </th>
    </>
  )

  return (
    <>
      <div className='background-container'>
        <div className="season-select-wrap">
          <label className="season-label" htmlFor="season">Season:</label>
          <select id="season" className='season-select' value={selectedSeason} onChange={handleChange}>
            <option value="2026">2025-26</option>
            <option value="2025">2024-25</option>
          </select>
        </div>
        <div className='standings-layout'>
          <div className='conference-standings'>
            <h2 className='conference-title'>Eastern Conference</h2>
            <table>
              <colgroup className='col1' span='6'></colgroup>
              <colgroup className='col2' span='2'></colgroup>
              <colgroup className='col3' span='4'></colgroup>
              <colgroup className='col4' span='3'></colgroup>
              <tbody>
                <tr className='conference-row'>
                  <th className='conference-name'>
                    <span>
                      <span className='conference-team-title'>TEAM</span>
                    </span>
                  </th>
                  {headers}
                </tr>
                {EasternTeams?.map((team) => (
                  <Row key={team.Key} {...team} />
                ))}
              </tbody>
            </table>
          </div>
          <div className='conference-standings'>
            <h2 className='conference-title'>Western Conference</h2>
            <table>
              <colgroup className='col1' span='6'></colgroup>
              <colgroup className='col2' span='2'></colgroup>
              <colgroup className='col3' span='4'></colgroup>
              <colgroup className='col4' span='3'></colgroup>
              <tbody>
                <tr className='conference-row'>
                  <th className='conference-name'>
                    <span>
                      <span className='conference-team-title'>TEAM</span>
                    </span>
                  </th>
                  {headers}
                </tr>
                {WesternTeams?.map((team) => (
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