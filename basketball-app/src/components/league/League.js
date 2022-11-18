import { useState, useEffect } from 'react'
import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import './League.css'
const League = () => {

  const [leagueData, setLeagueData] = useState()

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


  return (
    <div className='container'>
      {leagueData?.map(({ City, WikipediaLogoUrl, Name, Conference, Division, Key }) => (
        <Card key={Key}>
          <h2>{City} {Name}</h2>
          <h4>{Conference} Conference, {Division} Division</h4>
          <img src={WikipediaLogoUrl} alt='All teams in the nba' />
        </Card>
      ))}
    </div>
  )
}

export default League