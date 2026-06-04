import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../api/Api'
import './Player.css'
import Loading from '../loading/Loading'
import PlayerStats from '../playerStats/PlayerStats'
import PlayerPhoto from '../playerPhoto/PlayerPhoto'
import { getBBRefPhotoUrl } from '../../utils/playerPhotoUtils'
import { Link } from 'react-router-dom'

const buildPlayerApiUrl = (baseUrl, playerId, apiKey) =>
  `${baseUrl}/Player/${playerId}?key=${apiKey}`

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
      month: null,
      convertMonth: null,
      objectDate: '',
      birthDay: '',
      birthYear: '',
      lengthofBirth: 0,
      monthNameLength: 0,
      dayLength: 0,
    }
  }

  const today = new Date()
  const year = today.getFullYear()
  const month = Number(today.toLocaleDateString().split('/')[0])

  const birthYearFromIso = Number(birthDateRaw.split('-')[0])
  const convertMonth = Number(birthDateRaw.split('-')[1])

  const objectDate = new Date(birthDateRaw).toLocaleDateString('em-US', {
    month: 'long',
  })

  let date = new Date(birthDateRaw).toLocaleDateString()
  const getBirth = date.split('/')
  const birthDay = getBirth[1]
  const birthYear = getBirth[2]

  const birthdateFullString = `${objectDate} ${birthDay}, ${birthYear}`
  const lengthofBirth = birthdateFullString.length
  const monthNameLength = objectDate.length
  const dayLength = birthDay.length

  const age = year - birthYearFromIso

  return {
    age,
    month,
    convertMonth,
    objectDate,
    birthDay,
    birthYear,
    lengthofBirth,
    monthNameLength,
    dayLength,
  }
}

const Player = () => {
  const [playerData, setPlayerData] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null);

  const APIKEY = process.env.REACT_APP_API_KEY

  const params = useParams()
  const obj = new URLSearchParams(params);
  const playerid = obj.get('playerid')
  const results = buildPlayerApiUrl(baseUrl, playerid, APIKEY)

  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await fetch(results)
        const data = await response.json()
        setPlayerData(data)
        const computedPhotoUrl = computePlayerPhotoUrl(data)
        setPhotoUrl(computedPhotoUrl)
      } catch (error) {
        console.log(error)
      }
    }
    playerData()
  }, [results])

  if (!playerData) return <Loading />

  const { Salary, BirthState, Team, BirthCity, BirthCountry, BirthDate, Jersey, Position, FirstName, LastName, Weight, Experience, HighSchool, College, Height } = playerData

  const salaryString =
    Salary != null && Salary !== '' ? Salary.toLocaleString('en-US') : null

  const { feet, inches, metersValue } = computeHeightMetrics(Height)
  const { weightKg } = computeWeightMetrics(Weight)
  const {
    age,
    month,
    convertMonth,
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

  return (
    <div>
      <div className='player-header'>
        <div className='player-vitals'>
          <div className='player-photo-bio-wrapper'>
            <PlayerPhoto photoUrl={photoUrl} altText={`${FirstName} ${LastName}`} data={playerData} />
            <div className='player-bio'>
              <p className='player-header-number'><Link to={`/${Team}`}>{Team}</Link> {Jersey !== null && `| #${Jersey}`} | {Position}</p>
              <div className='nameAndStats'>
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
                  {month < convertMonth ? age - 1 : age}
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