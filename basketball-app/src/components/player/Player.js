import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurL } from '../../api/Api'
import './Player.css'


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

  // let result = Number(playerData?.Height / 12).toFixed(1)
  // let feet = Number(result.toString().split(".")[0])
  // let inches = Number(result.toString().split(".")[1])

  let grabHeight = Number(playerData?.Height / 12).toFixed(1)
  let feet = grabHeight.split(".")[0]
  let inches = grabHeight.split(".")[1]
  console.log(inches)

  let date = playerData?.BirthDate

  date = new Date(date).toLocaleDateString().split("/")

  let birthMonth = date[0] < 10 ? `0${date[0]}` : `${date[0]}`
  let birthDay = date[1] < 10 ? `0${date[1]}` : `${date[1]}`
  let birthYear = date[2]

  let proDebut = playerData?.ProDebut
  proDebut = new Date(proDebut).toLocaleDateString().split("/")
  let proDebutMonth = proDebut[0] < 10 ? `0${proDebut[0]}` : `${proDebut[0]}`
  let proDebutDay = proDebut[1] < 10 ? `0${proDebut[1]}` : `${proDebut[1]}`
  let proDebutYear = proDebut[2]

  const today = new Date();
  const year = today.getFullYear();

  let convertToCm = feet * 30.48
  let convertInches = inches * 2.54
  let resultOfBoth = convertInches + convertToCm
  let value = resultOfBoth / 100
  console.log(Number(value.toFixed(2)))

  // How to Convert 6 feet + 8 inches to cm or m?
  // Please follow these steps:

  // Multiply the value in feet by 30.48 to get the result of the conversion of feet in cm:
  // 6 x 30.48 = 183cm
  // Multiply the value in inches by 2.54 to get the result of the conversion from inches to cm:
  // 8 x 2.54 = 20.3cm
  // Now, add the two partial results to obtain the final value in cm:
  // 183 + 20.3 = 203cm.

  // Divide the value 2.03cm by 100 to get the result in meters.
  // 203
  // 100
  //  = 2.03m
  // See also: How to convert 203.2 cm to feet and inches.
  // By coolconversion.com


  return (
    <>
      <div className='player-header'>
        <img className='player-photo' src={playerData?.PhotoUrl} alt='Bio Card' />
        <div className='player-vitals'>
          <div className='player-bio'>
            <p className='player-header-number'>#{playerData?.Jersey} | {playerData?.Position}</p>
            <p className='player-header-name'>{playerData?.FirstName}</p>
            <p className='player-header-name'>{playerData?.LastName}</p>
          </div>
          {/* <ul>
            <li className='player-header-height'>{feet}'{inches}"/{playerData?.Weight}</li>
            <li className='player-header-age'>Age: {year - playerData?.BirthDate.split("-")[0]}</li>
          </ul> */}
          <section className='player-data'>
            <div className='player-height'>
              <ul className='player-info'>
                <div>
                  <p>HEIGHT</p>
                  <p className='players-height'>{feet}'{inches}" ({value.toFixed(2)}m)</p>
                </div>
              </ul>
              {/* <p className='player-height-info'>HEIGHT</p>
              <p className='players-height'>{playerData?.Height}</p> */}
            </div>
            <div className='player-weight'>
              <ul className='player-info'>
                <div>
                  <p>Weight</p>
                  <p className='players-weight'>{playerData?.Weight}lb</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcountry'>
              <ul className='player-info'>
                <div>
                  <p>Country</p>
                  <p className='players-weight'>{playerData?.BirthCountry}</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcountry'>
              <ul className='player-info'>
                <div>
                  <p>College</p>
                  <p className='players-college'> {playerData?.College !== "None" ? <li>
                    {playerData?.College}
                  </li> : "None"}</p>
                </div>
              </ul>
            </div>
            {/* <div className='player-weight'>
              <p className='player-weight-info'>Weight</p>
              <p className='players-weight'>{playerData?.Weight}</p>
            </div> */}
          </section>
        </div>
        {/* <div className='player-bio'>
          <ul>
            <li className='born'>
              <span className='label'>Born: </span>
              {birthMonth}/{birthDay}/{birthYear} in {playerData?.BirthCity}, {playerData?.BirthState ? playerData?.BirthState : playerData?.BirthCountry}
            </li>
            {playerData?.College !== "None" ? <li>
              <span className='label'>College: </span>
              {playerData?.College}
            </li> : null}
          </ul>
        </div> */}
      </div >
    </>
  )
}

export default Player

/* What i was working with now going to copy what i did on the sports app */
{/* <div className='player-header'>
          <img className='player-photo' src={playerData?.PhotoUrl} alt='Bio Card' />
          <div className='player-vitals'>
            <div className='player-bio'>
              <p className='player-header-summary'>#{playerData?.Jersey} | {playerData?.Position}</p>
              <p className='player-header-name'>{playerData?.FirstName}</p>
              <p className='player-header-name'>{playerData?.LastName}</p>
            </div>
            <section className='player-data'>
              <div className='player-height'>
                <p className='player-height-info'>HEIGHT</p>
                <p className='players-height'>{playerData?.Height}</p>
              </div>
              <div className='divider'></div>
              <div className='player-weight'>
                <p className='player-weight-info'>Weight</p>
                <p className='players-weight'>{playerData?.Weight}</p>
              </div>
            </section> */}