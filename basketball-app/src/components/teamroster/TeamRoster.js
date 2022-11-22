import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './TeamRoster.css'

import { useParams } from 'react-router-dom'



const TeamRoster = () => {

  const [roster, setRoster] = useState()

  const APIKEY = process.env.REACT_APP_API_KEY


  const params = useParams()

  const obj = new URLSearchParams(params);


  const term = obj.get('team')

  let result = `${baseurL}/Players/${term}?key=${APIKEY}`



  useEffect(() => {
    const rosterData = async () => {
      try {
        const response = await fetch(result)
        let rosterInfo = await response.json()
        setRoster(rosterInfo)
      } catch (error) {
        console.log(error)
      }
    }
    rosterData()
  }, [])

  console.log(roster)

  // console.log(leagueData)

  let active = roster?.filter((status) => status.Status === 'Active')

  return (
    <div className='team-container'>
      {active?.map(({ Jersey, FirstName, LastName, PlayerID }) => (
        <Card key={PlayerID}>
          <h2><a href={`/${PlayerID}`}>{FirstName}, {LastName}</a></h2>
        </Card>
      ))}
    </div>
  )
}

export default TeamRoster