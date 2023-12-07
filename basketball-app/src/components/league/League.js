import { useState, useEffect } from 'react'
import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import './League.css'

const League = () => {

  const [leagueData, setLeagueData] = useState([])
  const [initialTeams, setIntialTeams] = useState(leagueData)
  const [filteredResults, setFilteredResults] = useState(undefined)

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


  let allTeams = leagueData
  let displayData = allTeams

  console.log(leagueData)

  let sortTeams = leagueData?.sort((a, b) => a.Key.localeCompare(b.Key))
  let East = leagueData?.filter((team) => team.Conference === 'Eastern')
  let Atlantic = East?.filter((team) => team.Division === 'Atlantic')
  let Central = East?.filter((team) => team.Division === 'Central')
  let Southeast = East?.filter((team) => team.Division === 'Southeast')
  let West = leagueData?.filter((team) => team.Conference === 'Western')
  let Southwest = West?.filter((team) => team.Division === 'Southwest')
  let Northwest = West?.filter((team) => team.Division === 'Northwest')
  let Pacific = West?.filter((team) => team.Division === 'Pacific')


  const handleChange = (event) => {
    setIntialTeams(event.target.value)
  }

  if (initialTeams === "ALL") {
    displayData = sortTeams
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
    displayData = Northwest
  }
  if (initialTeams === 'Southwest') {
    displayData = Southwest
  }
  if (initialTeams === 'Pacific') {
    displayData = Pacific
  }

  return (
    <div className='container'>
      <label>
        <select value={filteredResults} onChange={handleChange}>
          <option multiple={false} value={"ALL"}>ALL</option>
          <option multiple={false} value={"East"}>Eastern Conference</option>
          <option multiple={false} value={"Atlantic"}>Atlantic Division</option>
          <option multiple={false} value={"Central"}>Central Division</option>
          <option multiple={false} value={"Southeast"}>Southeast Division</option>
          <option multiple={false} value={"West"}>Western Conference</option>
          <option multiple={false} value={"Northwest"}>Northwest Division</option>
          <option multiple={false} value={"Pacific"}>Pacific Division</option>
          <option multiple={false} value={"Southwest"}>Southwest Division</option>
        </select>
      </label>

      {displayData?.map(({ City, HeadCoach, QuaternaryColor, TertiaryColor, WikipediaLogoUrl, Name, Conference, Division, Key, PrimaryColor, SecondaryColor }) => (
        <Card key={Key} style={{ backgroundColor: '#' + TertiaryColor }}>
          <div className='league-info' style={{ 'backgroundColor': '#' + PrimaryColor }}>
            <h2 style={{ 'color': '#' + SecondaryColor, backgroundColor: '#' + PrimaryColor }}>Head Coach: {HeadCoach}</h2>
            <h2><a style={{ 'color': '#' + SecondaryColor }} href={`/${Key}`}>{City} {Name}</a></h2>
            <img className='team-photo' src={WikipediaLogoUrl} alt='All teams in the NBA' />
          </div>
        </Card>
      )
      )}
    </div >
  )
}

export default League