import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurL } from '../../api/Api'
import './Player.css'
import Loading from '../loading/Loading'


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


  if (!playerData) return <Loading />

  let grabHeight = Number(playerData?.Height / 12).toFixed(1)
  let feet = grabHeight.split(".")[0]
  let inches = grabHeight.split(".")[1]

  let date = playerData?.BirthDate

  let objectDate = new Date(date).toLocaleDateString('em-US', { month: 'long' })

  date = new Date(date).toLocaleDateString()

  let getBirth = date.split("/")
  let birthDay = getBirth[1]
  let birthYear = getBirth[2]



  let playerSalary = playerData?.Salary ? playerData?.Salary.toLocaleString('en-US') : <p className='noSalaryFound'>No Salary Found</p>
  let playerState = playerData?.BirthState ? playerData?.BirthState : <p>No State</p>
  // condition1 ? value1
  // : condition2 ? value2
  // : condition3 ? value3
  // : value4;

  const today = new Date();
  const year = today.getFullYear();

  let convertToCm = feet * 30.48
  let convertInches = inches * 2.54
  let resultOfBoth = convertInches + convertToCm
  let value = resultOfBoth / 100

  let convetFromPoundsToKG = Math.round(playerData?.Weight / 2.2046)

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
          <section className='player-data'>
            <div className='player-height'>
              <ul className='player-info'>
                <div>
                  <p>HEIGHT</p>
                  <p className='players-height'>{feet}'{inches}" ({value.toFixed(2)}m)</p>
                </div>
              </ul>
            </div>
            <div className='player-weight'>
              <ul className='player-info'>
                <div>
                  <p>WEIGHT</p>
                  <p className='players-weight'>{playerData?.Weight}lb ({convetFromPoundsToKG}kg)</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcountry'>
              <ul className='player-info'>
                <div>
                  <p>COUNTRY</p>
                  <p className='players-weight'>{playerData?.BirthCountry}</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcity'>
              <ul className='player-info'>
                <div>
                  <p>CITY</p>
                  <p className='players-city'>{playerData?.BirthCity}</p>
                </div>
              </ul>
            </div>
            <div className='player-state'>
              <ul className='player-info'>
                <div>
                  <p>STATE</p>
                  <p>{playerState}</p>
                </div>
              </ul>
            </div>
          </section>
          <section className='player-details'>
            <div className='player-age'>
              <ul className='player-info'>
                <div>
                  <p>AGE</p>
                  <p className='players-age'>{year - playerData?.BirthDate.split("-")[0]} Years</p>
                </div>
              </ul>
            </div>
            <div className='player-birthdate'>
              <ul className='player-info'>
                <div>
                  <p>BIRTHDATE</p>
                  <h4 className='players-birthday'>{objectDate} {birthDay}, {birthYear}</h4>
                </div>
              </ul>
            </div>
            <div className='player-experience'>
              <ul className='player-info'>
                <div>
                  <p>EXPERIENCE</p>
                  <p className='players-weight'>{playerData?.Experience}</p>
                </div>
              </ul>
            </div>
            <div className='player-salary'>
              <ul className='player-info'>
                <div>
                  <p>SALARY</p>
                  <p className='players-dollars'>{playerSalary}</p>
                </div>
              </ul>
            </div>
            <div className='player-college'>
              <ul className='player-info'>
                <div>
                  <p>{playerData?.College !== "None" ? "College" : playerData?.HighSchool ? "High School" : "No School"}</p>
                  <p className='players-college'> {playerData?.College !== "None" ? <li>
                    {playerData?.College}
                  </li> : playerData.HighSchool ? playerData?.HighSchool : "None"}</p>
                </div>
              </ul>
            </div>
          </section>
        </div>
      </div >
    </>
  )
}

export default Player