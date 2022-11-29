import { useState, useEffect } from 'react'
import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import './League.css'

const League = () => {

  const [initialTeams, setIntialTeams] = useState()
  const [leagueData, setLeagueData] = useState([])
  const [filteredResults, setFilteredResults] = useState(null)


  const APIKEY = process.env.REACT_APP_API_KEY

  let result = `${baseurL}/teams?key=${APIKEY}`


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


  console.log(leagueData)

  let allTeams = leagueData
  let displayData = allTeams


  let West = leagueData?.filter((team) => team.Conference === 'Western')
  let East = leagueData?.filter((team) => team.Conference === 'Eastern')
  let Southeast = leagueData?.filter((team) => team.Division === 'Southeast')
  let Southwest = leagueData?.filter((team) => team.Division === 'Southwest')
  let Atlantic = East?.filter((team) => team.Division === 'Atlantic')
  let Central = leagueData?.filter((team) => team.Division === 'Central')
  let NorthWest = leagueData?.filter((team) => team.Division === 'Northwest')
  let Pacific = leagueData?.filter((team) => team.Division === 'Pacific')


  const handleChange = (event) => {
    setIntialTeams(event.target.value)
  }

  if (initialTeams === "ALL") {
    displayData = leagueData
  }

  if (initialTeams === 'East') {
    displayData = East
  }
  if (initialTeams === 'Atlantic') {
    displayData = Atlantic
  }
  if (initialTeams === "Central") {
    displayData = Central
  }
  if (initialTeams === 'Southeast') {
    displayData = Southeast
  }
  if (initialTeams === "West") {
    displayData = West
  }
  if (initialTeams === 'Northwest') {
    displayData = NorthWest
  }
  if (initialTeams === 'Pacific') {
    displayData = Pacific
  }
  if (initialTeams === 'Southwest') {
    displayData = Southwest
  }


  return (
    <div className='container'>
      <label>
        <select value={filteredResults} onChange={handleChange}>
          <option multiple={false} value={"ALL"}>ALL</option>
          <option multiple={false} value={"East"}>East</option>
          <option multiple={false} value={"Atlantic"}>Atlantic Division</option>
          <option multiple={false} value={"Central"}>Central Division</option>
          <option multiple={false} value={"Southeast"}>Southeast Division</option>
          <option multiple={false} value={"West"}>West</option>
          <option multiple={false} value={"Northwest"}>Northwest Division</option>
          <option multiple={false} value={"Pacific"}>Pacific Division</option>
          <option multiple={false} value={"Southwest"}>Southwest Division</option>
        </select>
      </label>
      {displayData?.map(({ City, WikipediaLogoUrl, Name, Conference, Division, Key, PrimaryColor, SecondaryColor }) => (
        <Card key={Key}>
          <div className='league-info' style={{ 'backgroundColor': '#' + PrimaryColor }}>
            <h2><a style={{ 'color': '#' + SecondaryColor }} href={`/${Key}`}>{City} {Name}</a></h2>
            <img src={WikipediaLogoUrl} alt='All teams in the NBA' />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default League