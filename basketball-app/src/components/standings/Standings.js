import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './Standings.css'

import { useParams } from 'react-router-dom'


const Standings = () => {

  const [getStandings, setGetStadings] = useState()

  const APIKEY = process.env.REACT_APP_API_KEY


  const params = useParams()

  const obj = new URLSearchParams(params);



  let result = `${baseurL}/Standings/2023?key=${APIKEY}`

  useEffect(() => {
    const getStandings = async () => {
      try {
        const data = await fetch(result)
        const response = await data.json()
        setGetStadings(response)
      } catch (error) {
        console.log(error)
      }
    }
    getStandings()
  }, [])

  console.log(getStandings)

  let Eastern = getStandings?.filter((east) => east.Conference === 'Eastern')
  let Western = getStandings?.filter((west) => west.Conference === 'Western')


  let headers = (
    <>
      <th className='team'>
        {/* <span className='span'>
          <span className='team'>TEAM</span> */}
        TEAM
        {/* </span> */}
      </th>
      <th className='record'>
        <span className='span'>
          <span className='teamw'>W</span>
        </span>
      </th>
      <th className='record'>
        <span className='team'>
          <span className='teaml'>L</span>
        </span>
      </th>
      <th className='winpercent'>
        <span className='points'>
          <span className='percentofw'>WIN%</span>
        </span>
      </th>
      <th className='gb'>
        <span className='points'>
          <span className='tgb'>GB</span>
        </span>
      </th>
      <th className='conf'>
        <span className='record'>
          <span className='confrecord'>CONF</span>
        </span>
      </th>
      <th className='div'>
        <span className='record'>
          <span className='divrecord'>DIV</span>
        </span>
      </th>
      <th className='home'>
        <span className='record'>
          <span className='homerecord'>HOME</span>
        </span>
      </th>
      <th className='road'>
        <span className='record'>
          <span className='roadrecord'>ROAD</span>
        </span>
      </th>
      <th className='last10'>
        <span className='l10record'>
          <span className='l10'>LAST10</span>
        </span>
      </th>
      <th className='streak'>
        <span className='tstreak'>
          <span className='teamStreak'>STREAK</span>
        </span>
      </th>
    </>
  )

  return (
    <>
      <h2 className='conference-title'>Eastern Conference</h2>
      <table>
        <colgroup className='col1' span='6'></colgroup>
        <tbody>
          <tr>
            <th className='conference-name'>
              {headers}
            </th>
          </tr>
          {Eastern?.map(({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => (
            <tr className='stats-standings'>
              <td className='city-name'>{City} {Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='conference-title'>
        Western Conference
      </h2>
      <table>
        <colgroup className='col1' span='6'></colgroup>
        <tbody>
          <tr className='conference-row'>
            <th className='conference-name'>
              {headers}
            </th>
          </tr>
        </tbody>
        {Western?.map(({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => (
          <h2>{City} {Name}</h2>
        ))}
      </table>
    </>
  )
}

export default Standings