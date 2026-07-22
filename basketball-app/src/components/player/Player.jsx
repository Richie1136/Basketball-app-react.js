import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Player.css'
import Loading from '../loading/Loading'
import PlayerStats from '../playerStats/PlayerStats'
import PlayerPhoto from '../playerPhoto/PlayerPhoto'
import { getBBRefPhotoUrl } from '../../utils/playerPhotoUtils'
import { Link } from 'react-router-dom'

const computePlayerPhotoUrl = (data) => {
  if (data.FirstName && data.LastName) {
    const firstName =
      data.FirstName === 'Bub' ? data.DraftKingsName : data.FirstName
    const lastName = data.LastName

    // Use DraftKingsName for some foreign players because it avoids special characters
    const BBRefPhoto = getBBRefPhotoUrl(firstName, lastName)
    return BBRefPhoto
  }

  return data.PhotoUrl || null
}

const computeHeightMetrics = (heightInInches) => {
  if (!heightInInches && heightInInches !== 0) {
    return {
      feet: '',
      inches: '',
      metersValue: 0,
    }
  }

  const grabHeight = Number(heightInInches / 12).toFixed(1)
  const [feet, inches] = grabHeight.split('.')

  const convertToCm = feet * 30.48
  const convertInches = inches * 2.54
  const resultOfBoth = convertInches + convertToCm
  const metersValue = resultOfBoth / 100

  return {
    feet,
    inches,
    metersValue,
  }
}

const computeWeightMetrics = (weightInPounds) => {
  if (!weightInPounds && weightInPounds !== 0) {
    return {
      weightKg: 0,
      weightKgLength: 0,
    }
  }

  const weightKg = Math.round(weightInPounds / 2.2046)
  const weightKgLength = weightKg.toString().length

  return {
    weightKg,
    weightKgLength,
  }
}

const computeAgeAndBirthdateMetrics = (birthDateRaw) => {
  if (!birthDateRaw) {
    return {
      age: null,
      objectDate: '',
      birthDay: '',
      birthYear: '',
    }
  }

  const today = new Date()
  const birthDate = new Date(birthDateRaw)
  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  const objectDate = new Date(birthDateRaw).toLocaleDateString('en-US', {
    month: 'long',
  })

  const date = birthDate.toLocaleDateString()
  const getBirth = date.split('/')
  const birthDay = getBirth[1]
  const birthYear = getBirth[2]

  return {
    age,
    objectDate,
    birthDay,
    birthYear
  }
}

const Player = () => {
  const [playerData, setPlayerData] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true)

  const params = useParams()
  const obj = new URLSearchParams(params);
  const playerid = obj.get('playerid')

  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;


  useEffect(() => {
    const playerData = async () => {
      setLoadingStats(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/player_info?playerId=${playerid}`)
        const data = await response.json()
        setPlayerData(data)
        const computedPhotoUrl = computePlayerPhotoUrl(data)
        setPhotoUrl(computedPhotoUrl)
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingStats(false)
      }
    }
    playerData()
  }, [playerid])

  if (!playerData) return <Loading />

  const { Salary, BirthState, Team, BirthCity, BirthCountry, BirthDate, Jersey, Position, FirstName, LastName, Weight, Experience, HighSchool, College, Height } = playerData

  const salaryString =
    Salary != null && Salary !== '' ? Salary.toLocaleString('en-US') : null

  const { feet, inches, metersValue } = computeHeightMetrics(Height)
  const { weightKg } = computeWeightMetrics(Weight)
  const {
    age,
    objectDate,
    birthDay,
    birthYear
  } = computeAgeAndBirthdateMetrics(BirthDate)

  const schoolLabel =
    College && College !== 'None'
      ? 'COLLEGE'
      : HighSchool
        ? 'HIGH SCHOOL'
        : 'SCHOOL'

  if (loadingStats) {
    return <p>Loading Player Stats</p>
  }

  return (
    <div>
      <div className='player-header'>
        <div className='player-vitals'>
          <div>
            <PlayerPhoto photoUrl={photoUrl} altText={`${FirstName} ${LastName}`} data={playerData} />
            <div className='player-bio'>
              <p className='player-header-number'><Link to={`/${Team}`}>{Team}</Link> {Jersey !== null && `| #${Jersey}`} | {Position}</p>
              <div className='name-and-stats'>
                <div className='player-name'>
                  <p className='player-header-name'>{FirstName}</p>
                  <p className='player-header-name'>{LastName}</p>
                </div>
              </div>
            </div>
          </div>
          <section className="player-data-grid" aria-label="Player information">
            <div className="vital-cell">
              <span className="vital-label">HEIGHT</span>
              <span className="vital-value">
                {feet}&apos;{inches}&quot; ({metersValue.toFixed(2)}m)
              </span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">WEIGHT</span>
              <span className="vital-value">
                {Weight}lbs ({weightKg}kg)
              </span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">COUNTRY</span>
              <span className="vital-value">{BirthCountry ?? ''}</span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">BIRTH CITY</span>
              <span className={BirthCity?.length === 15 || BirthCity?.length === 17 ? "vital-value vital-value--no-wrap" : "vital-value"}>{BirthCity ?? ''}</span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">BIRTH STATE</span>
              <span className={BirthState ? "vital-value" : 'vital-value vital-value--muted'}>{BirthState || 'No State'}</span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">AGE</span>
              {BirthDate !== null ? (
                <span className="vital-value">
                  {age}
                </span>
              ) : (
                <span className="vital-value">No Age Found</span>
              )}
            </div>
            <div className="vital-cell">
              <span className="vital-label">BIRTHDATE</span>
              {BirthDate !== null ? (
                <h4 className={`vital-birthdate`}>
                  {objectDate} {birthDay}, {birthYear}
                </h4>
              ) : (
                <span className="vital-value">No Birthdate Found</span>
              )}
            </div>
            <div className="vital-cell">
              <span className="vital-label">EXPERIENCE</span>
              <span className="vital-value">
                {Experience === 0 || Experience === null
                  ? 'Rookie'
                  : Experience === 1
                    ? `${Experience} Year`
                    : `${Experience} Years`}
              </span>
            </div>
            <div className="vital-cell">
              <span className="vital-label">SALARY</span>
              {salaryString ? (
                <span className={'vital-value'}>
                  ${salaryString}
                </span>
              ) : (
                <span className="vital-value vital-value--muted">No Salary Found</span>
              )}
            </div>
            <div className="vital-cell">
              <span className="vital-label">{schoolLabel}</span>
              <span className={schoolLabel === 'SCHOOL' ? 'vital-value vital-value--muted' : College?.length === 16 || College?.length === 17 || HighSchool?.length === 17 ? 'vital-value vital-value--no-wrap' : "vital-value vital-value--wrap"}>
                {College && College !== 'None' ? College : HighSchool || 'No School'}
              </span>
            </div>
          </section>
        </div>
      </div>
      <PlayerStats data={playerData} />
    </div>
  )
}

export default Player