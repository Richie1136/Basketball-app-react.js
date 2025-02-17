import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurL } from '../../api/Api'
import './Player.css'
import Loading from '../loading/Loading'
import PlayerStats from '../playerStats/PlayerStats'

const Player = () => {
  const [playerData, setPlayerData] = useState()

  const APIKEY = process.env.REACT_APP_API_KEY

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


  if (!playerData) return <Loading />
  const { Salary, BirthState, Team, BirthCity, BirthCountry, BirthDate, Jersey, Position, FirstName, LastName, Weight, Experience, HighSchool, College, Height } = playerData


  let grabHeight = Number(Height / 12).toFixed(1)
  let feet = grabHeight.split(".")[0]
  let inches = grabHeight.split(".")[1]
  let date = BirthDate


  let objectDate = new Date(date).toLocaleDateString('em-US', { month: 'long' })
  date = new Date(date).toLocaleDateString()

  let getBirth = date.split("/")
  let birthDay = getBirth[1]
  let birthYear = getBirth[2]
  let playerSalary = Salary ? Salary.toLocaleString('en-US') : <p className='noSalaryFound'>No Salary Found</p>
  let playerState = BirthState ? BirthState : <p>No State</p>


  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleDateString().split("/")[0]
  const convertMonth = BirthDate.split("-")[1]

  let lengthofBirth = objectDate.length + birthYear.length + birthDay.length

  let age = year - BirthDate.split("-")[0]

  let convertToCm = feet * 30.48
  let convertInches = inches * 2.54
  let resultOfBoth = convertInches + convertToCm
  let value = resultOfBoth / 100
  let convetFromPoundsToKG = Math.round(Weight / 2.2046)

  let KGgreaternumbgreaterthan2 = convetFromPoundsToKG.toString().length

  return (
    <div>
      <div className='player-header'>
        <div className='player-vitals'>
          <div className='player-bio'>
            <p className='player-header-number'><a href={`/${Team}`}>{Team}</a> | #{Jersey} | {Position}</p>
            <div className='nameAndStats'>
              <div className='player-name'>
                <p className='player-header-name'>{FirstName}</p>
                <p className='player-header-name'>{LastName}</p>
              </div>
            </div>
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
                  <p className={KGgreaternumbgreaterthan2 > 2 ? 'heavier' : 'players-weight'}>WEIGHT</p>
                  <p className={KGgreaternumbgreaterthan2 > 2 ? 'heavierWeight' : 'players-weight'}>{Weight}lbs ({convetFromPoundsToKG}kg)</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcountry'>
              <ul className='player-info'>
                <div>
                  <p>COUNTRY</p>
                  <p className='players-weight'>{BirthCountry}</p>
                </div>
              </ul>
            </div>
            <div className='player-birthcity'>
              <ul className='player-info'>
                <div>
                  <p>CITY</p>
                  <p className={BirthCity.length === 15 ? '' : 'players-city'}>{BirthCity}</p>
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
                  <p className='players-age'>{month < convertMonth ? age - 1 : age} Years</p>
                </div>
              </ul>
            </div>
            <div className='player-birthdate'>
              <ul className='player-info'>
                <div>
                  <p>BIRTHDATE</p>
                  <h4 className={lengthofBirth < 12 ? 'players-Short' : 'players-birthday'}>{objectDate} {birthDay}, {birthYear}</h4>

                </div>
              </ul>
            </div>
            <div className='player-experience'>
              <ul className='player-info'>
                <div>
                  <p>EXPERIENCE</p>
                  <p className='players-weight'>{Experience === 0 ? 'Rookie' : Experience === 1 ? Experience + ' Year' : Experience + ' Years'}</p>
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
                  <p>{College !== "None" ? "College" : HighSchool ? "High School" : "School"}</p>
                  <p className={College.length === 19 ? 'players-college-long' : 'players-college'}> {College !== "None" ? <li>
                    {College}
                  </li> : HighSchool ? HighSchool : "No School"}</p>
                </div>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <PlayerStats data={playerData} />
    </div>
  )
}

export default Player