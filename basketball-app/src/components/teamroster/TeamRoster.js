import { baseurL } from '../../api/Api'
import Card from '../card/Card'
import { useState, useEffect } from 'react'
import './TeamRoster.css'
import Loading from '../loading/Loading'
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

  let active = roster?.filter((status) => status.Status === 'Active').sort((a, b) => a.Jersey - b.Jersey)

  if (!roster) return <Loading />

  return (
    <div className='team-container'>
      {active?.map(({ Jersey, FirstName, LastName, PlayerID, Position, PhotoUrl }) => (
        <Card key={PlayerID}>
          <img src={PhotoUrl} alt='Player screenshot' />
          <h2><a href={`/player/${PlayerID}`}>{FirstName} {LastName}</a></h2>
          <h4>{Jersey}</h4>
          <h5>{Position}</h5>
        </Card>
      ))}
    </div>
  )
}

export default TeamRoster