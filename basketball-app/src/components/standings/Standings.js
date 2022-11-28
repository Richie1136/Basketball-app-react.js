import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './Standings.css'
import Row from '../row/Row'

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
  let filteredTeams = Eastern?.filter((percent) => percent.Wins).sort((a, b) => a - b)
  console.log(filteredTeams)
  let headers = (
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
          <span className='header-percentage'>WIN%</span>
        </span>
      </th>
      <th className='gb'>
        <span className='runs'>
          <span className='tgb'>GB</span>
        </span>
      </th>
      <th className='conf'>
        <span className='tstreak'>
          <span className='twcgb'>CONF</span>
        </span>
      </th>
      <th className='div'>
        <span className='runs'>
          <span className='trs'>DIV</span>
        </span>
      </th>
      <th className='home'>
        <span className='span'>
          <span className='hr'>Home</span>
        </span>
      </th>
      <th className='road'>
        <span className='span'>
          <span className='ar'>Road</span>
        </span>
      </th>
      <th className='last10'>
        <span className='runs'>
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
        <colgroup className='col2' span='2'></colgroup>
        <colgroup className='col3' span='4'></colgroup>
        <colgroup className='col4' span='3'></colgroup>
        <tbody>
          <tr className='division-row'>
            <th className='division-name'>
              <span>
                <span className='division-title'>TEAM</span>
              </span>
            </th>
            {headers}
          </tr>
        </tbody>
        {Eastern?.map(({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => (

          <Row key={Name} Name={Name} City={City} Losses={Losses} Wins={Wins} Percentage={Percentage} GamesBack={GamesBack} ConferenceLosses={ConferenceLosses} ConferenceWins={ConferenceWins} DivisionLosses={DivisionLosses} DivisionWins={DivisionWins} HomeLosses={HomeLosses} HomeWins={HomeWins} AwayLosses={AwayLosses} AwayWins={AwayWins} LastTenLosses={LastTenLosses} LastTenWins={LastTenWins} Streak={Streak} />
        ))}
        <br />
        <h2 className='conference-title'>Western Conference</h2>
        <tbody>
          <tr className='division-row'>
            <th className='division-name'>
              <span>
                <span className='division-title'>TEAM</span>
              </span>
            </th>
            {headers}
          </tr>
        </tbody>
        <br />
        {Western?.map(({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => (
          <Row key={Name} Name={Name} City={City} Losses={Losses} Wins={Wins} Percentage={Percentage} GamesBack={GamesBack} ConferenceLosses={ConferenceLosses} ConferenceWins={ConferenceWins} DivisionLosses={DivisionLosses} DivisionWins={DivisionWins} HomeLosses={HomeLosses} HomeWins={HomeWins} AwayLosses={AwayLosses} AwayWins={AwayWins} LastTenLosses={LastTenLosses} LastTenWins={LastTenWins} Streak={Streak} />
        ))}
      </table>
    </>
  )

}

export default Standings