import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurL } from '../../api/Api'


const APIKEY = process.env.REACT_APP_API_KEY

const Player = () => {
  const [playerData, setPlayerData] = useState()
  const params = useParams()

  const obj = new URLSearchParams(params);


  const playerid = obj.get('playerid')

  let results = `${baseurL}/Player/${playerid}?key=${APIKEY}`


  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await fetch(results)
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
    <>
      <div className='player-header'>
        <img src={playerData?.PhotoUrl} />
      </div>

    </>
  )
}

export default Player