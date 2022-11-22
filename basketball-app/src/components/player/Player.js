import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurL } from '../../api/Api'



const Player = () => {
  const [playerData, setPlayerData] = useState()
  const params = useParams()

  const obj = new URLSearchParams(params);
  const APIKEY = process.env.REACT_APP_API_KEY


  const term = obj.get('PlayerID')

  let results = `${baseurL}/Player/${term}?key=${APIKEY}`
  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await fetch(results)
        console.log(response)
        const data = await response.json()
        setPlayerData(data)
      } catch (error) {
        console.log(error)
      }
    }
    playerData()
  }, [results])

  console.log(playerData)

  return (
    <div>Player</div>
  )
}

export default Player