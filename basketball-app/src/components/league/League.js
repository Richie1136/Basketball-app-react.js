import { useState, useEffect } from 'react'
import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import './League.css'

const League = () => {

  const [leagueData, setLeagueData] = useState()
  const [initialTeams, setInitialTeams] = useState(leagueData)
  const [filteredResults, setFilteredResults] = useState(null)

  const APIKEY = process.env.REACT_APP_API_KEY

  let result = `${baseurL}/teams?key=${APIKEY}`


  let displayData = leagueData

  useEffect(() => {
    const leagueData = async () => {
      try {
        const response = await fetch(result)
        const leagueInfo = await response.json()
        setLeagueData(leagueInfo)
      } catch (error) {
        console.log(error)
      }
    }
    leagueData()
  }, [result])

  // console.log(leagueData?.filter((team) => team.Conference === 'Western'))
  let west = leagueData?.filter((team) => team.Conference === 'Western')
  console.log(west)
  let east = leagueData?.filter((team) => team.Conference === 'Eastern')
  // console.log(east)

  console.log(leagueData?.Name)

  let All = leagueData

  let Southeast = leagueData?.filter((team) => team.Division === 'Southeast')
  let Southwest = leagueData?.filter((team) => team.Division === 'Southwest')
  let Atlantic = leagueData?.filter((team) => team.Division === 'Atlantic')
  let Central = leagueData?.filter((team) => team.Division === 'Central')
  let NorthWest = leagueData?.filter((team) => team.Division === 'Northwest')
  let Pacific = All?.filter((team) => team.Division === 'Pacific')
  let La = All?.filter((team) => team.Name === 'Wizards')


  const handleChange = (event) => {
    setLeagueData(event.target.value)
  }

  if (initialTeams === 'ALL') {
    displayData = All
  }
  if (initialTeams === "La") {
    displayData = La
  }
  if (initialTeams === 'Pacific') {
    displayData = Pacific
  }
  if (initialTeams === 'West') {
    displayData = west
  }
  // if (initialTeams === 'NL') {
  //   displayData = NL
  // }
  // if (initialTeams === "NL East") {
  //   displayData = NLE
  // }
  // if (initialTeams === 'NL Central') {
  //   displayData = NLC
  // }
  // if (initialTeams === 'NL West') {
  //   displayData = NLW
  // }



  return (
    <div className='container'>
      <label>
        <select value={filteredResults} onChange={handleChange}>
          <option multiple={false} value={"ALL"}>ALL</option>
          <option multiple={false} value={"West"}>West</option>
          <option multiple={false} value={"Pacific"}>Pacific</option>
          <option multiple={false} value={"AL Central"}>AL Central</option>
          <option multiple={false} value={"AL West"}>AL West</option>
          <option multiple={false} value={"East"}>East</option>
          <option multiple={false} value={"NL East"}>NL East</option>
          <option multiple={false} value={"NL Central"}>NL Central</option>
          <option multiple={false} value={"LA West"}>La</option>
        </select>
      </label>
      {displayData?.map(({ City, WikipediaLogoUrl, Name, Conference, Division, Key }) => (
        <Card key={Key}>
          <div className='league-info'>
            <h2><a href={`/${Key}`}>{City} {Name}</a></h2>
            <img src={WikipediaLogoUrl} alt='All teams in the NBA' />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default League