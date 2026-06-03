import { useState, useEffect } from 'react'
import { baseUrl } from '../../api/Api'
import Card from '../card/Card'
import { Link } from 'react-router-dom'
import './League.css'

const League = () => {

  const [leagueData, setLeagueData] = useState([])
  const [initialTeams, setIntialTeams] = useState("ALL Teams")

  const APIKEY = process.env.REACT_APP_API_KEY

  const result = `${baseUrl}/teams?key=${APIKEY}`

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


  const allTeams = leagueData

  const sortByKey = (teams) => [...(teams ?? [])].sort((a, b) => a.Key.localeCompare(b.Key))

  const sortTeams = sortByKey(leagueData)

  const East = sortByKey(leagueData?.filter((team) => team.Conference === 'Eastern'))
  const Atlantic = sortByKey(East?.filter((team) => team.Division === 'Atlantic'))
  const Central = sortByKey(East?.filter((team) => team.Division === 'Central'))
  const Southeast = sortByKey(East?.filter((team) => team.Division === 'Southeast'))

  const West = sortByKey(leagueData?.filter((team) => team.Conference === 'Western'))
  const Southwest = sortByKey(West?.filter((team) => team.Division === 'Southwest'))
  const Northwest = sortByKey(West?.filter((team) => team.Division === 'Northwest'))
  const Pacific = sortByKey(West?.filter((team) => team.Division === 'Pacific'))

  const filterMap = {
    "ALL Teams": sortTeams,
    East,
    Atlantic,
    Central,
    Southeast,
    West,
    Southwest,
    Northwest,
    Pacific
  }

  const displayData = filterMap[initialTeams] || allTeams;


  const handleChange = (event) => {
    setIntialTeams(event.target.value)
  }

  return (
    <div className='container'>
      <div className='select-container'>
        <label>
          <select value={initialTeams} onChange={handleChange}>
            <option value={"ALL Teams"}>ALL Teams</option>
            <option value={"East"}>Eastern Conference</option>
            <option value={"Atlantic"}>Atlantic Division</option>
            <option value={"Central"}>Central Division</option>
            <option value={"Southeast"}>Southeast Division</option>
            <option value={"West"}>Western Conference</option>
            <option value={"Northwest"}>Northwest Division</option>
            <option value={"Pacific"}>Pacific Division</option>
            <option value={"Southwest"}>Southwest Division</option>
          </select>
        </label>
      </div>

      <div className='cards-wrapper'>
        {displayData?.map(({ City, HeadCoach, TertiaryColor, WikipediaLogoUrl, Name, Conference, Division, Key, PrimaryColor, SecondaryColor }) => (
          <Card key={Key} style={{ backgroundColor: Name === 'Jazz' ? '#' + PrimaryColor : '#' + TertiaryColor }}>
            <div className='league-info' style={{ 'backgroundColor': Name === 'Jazz' ? '#' + TertiaryColor : '#' + PrimaryColor }}>
              <h2><Link style={{ 'color': '#' + SecondaryColor }} to={`/${Key}`}>{City} {Name}</Link></h2>
              <h2 style={{ 'color': '#' + SecondaryColor, backgroundColor: Name === 'Jazz' ? '#' + TertiaryColor : '#' + PrimaryColor }}>Head Coach: {HeadCoach !== null ? HeadCoach : 'N/A'}</h2>
              <img className='team-photo' src={WikipediaLogoUrl} alt={`${City} ${Name} logo}`} />
            </div>
          </Card>
        )
        )}
      </div>
    </div>
  )
}

export default League