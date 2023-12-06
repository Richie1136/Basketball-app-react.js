import { baseurL } from '../../api/Api'
import { useState, useEffect } from 'react'
import './Standings.css'
import { Row, Loading } from '../index'
import { useParams } from 'react-router-dom'

const Standings = () => {

  const [getStandings, setGetStadings] = useState()

  const APIKEY = process.env.REACT_APP_API_KEY
  const params = useParams()
  const obj = new URLSearchParams(params);
  const season = obj.get('season')

  let result = `${baseurL}/Standings/${season}?key=${APIKEY}`


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

  if (!getStandings) return <Loading />

  let Eastern = getStandings?.filter((east) => east.Conference === 'Eastern').sort((a, b) => b.Percentage - a.Percentage)
  let Western = getStandings?.filter((west) => west.Conference === 'Western').sort((a, b) => b.Percentage - a.Percentage)

  let number = 0

  let ranks = Eastern?.map(() => (
    number += 1
  ))

  let results = Eastern?.map((o, i) => ({ ...o, rank: ranks[i] }))

  let teamRanks = Western?.map((o, i) => ({ ...o, rank: ranks[i] }))

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
          <span>WIN%</span>
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
          <span>PPG</span>
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
      <th className='road-record'>
        <span className='span'>
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
          {results?.map(({ City, rank, ConferenceRank, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, PointsPerGameFor,
            PointsPerGameAgainst, Key, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, StreakDescription, Team }) => (
            <Row key={Key} rank={rank} ConferenceRank={ConferenceRank} Key={Key} Name={Name} Team={Team} City={City} Losses={Losses} Wins={Wins} Percentage={Percentage} StreakDescription={StreakDescription} GamesBack={GamesBack} ConferenceLosses={ConferenceLosses} ConferenceWins={ConferenceWins} DivisionLosses={DivisionLosses} DivisionWins={DivisionWins} HomeLosses={HomeLosses} HomeWins={HomeWins} AwayLosses={AwayLosses} AwayWins={AwayWins} PointsPerGameFor={PointsPerGameFor} PointsPerGameAgainst={PointsPerGameAgainst} LastTenLosses={LastTenLosses} LastTenWins={LastTenWins} />
          ))}
          <br />
          <h2 className='conference-west'>Western Conference</h2>
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
          {teamRanks?.map(({ City, Key, Name, Losses, rank, Wins, StreakDescription, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak, PointsPerGameFor, PointsPerGameAgainst }) => (
            <Row key={Key} Key={Key} Name={Name} rank={rank} City={City} Losses={Losses} Wins={Wins} StreakDescription={StreakDescription} Percentage={Percentage} GamesBack={GamesBack} ConferenceLosses={ConferenceLosses} ConferenceWins={ConferenceWins} DivisionLosses={DivisionLosses} DivisionWins={DivisionWins} PointsPerGameFor={PointsPerGameFor} PointsPerGameAgainst={PointsPerGameAgainst} HomeLosses={HomeLosses} HomeWins={HomeWins} AwayLosses={AwayLosses} AwayWins={AwayWins} LastTenLosses={LastTenLosses} LastTenWins={LastTenWins} />
          ))}
        </table>
      </div>
    </>
  )

}

export default Standings