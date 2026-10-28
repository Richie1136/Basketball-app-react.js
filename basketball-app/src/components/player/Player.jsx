import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Player.css'
import Loading from '../loading/Loading'
import PlayerStats from '../playerStats/PlayerStats'
import PlayerPhoto from '../playerPhoto/PlayerPhoto'
import { Link } from 'react-router-dom'
import { prefixedUrl } from '../../utils/prefixUrl'
import { computeHeightMetrics } from '../../utils/playerMetrics/computeHeightMetrics'
import { computeWeightMetrics } from '../../utils/playerMetrics/computeWeightMetrics'
import { computeAgeAndBirthdateMetrics } from '../../utils/playerMetrics/computeAgeAndBirthday'
import { computePlayerPhotoUrl } from '../../utils/playerMetrics/computePlayerPhotoUrl'

const Player = () => {
  const [playerData, setPlayerData] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { playerid } = useParams()


  useEffect(() => {
    const controller = new AbortController()

    const playerData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${prefixedUrl}/player_info?playerId=${playerid}`, { signal: controller.signal })
        if (!response.ok) {
          throw new Error("Unable to load player data")
        }
        const data = await response.json()
        setPlayerData(data)
        const computedPhotoUrl = computePlayerPhotoUrl(data)
        setPhotoUrl(computedPhotoUrl)
      } catch (error) {
        if (controller.signal.aborted) return
        setPlayerData(null)
        setError(error.message)
      } finally {
        // Only the active request can end loading.
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    playerData()
    // Cancel this request when the player changes or we leave the page.
    return () => {
      controller.abort()
    }
  }, [playerid])

  if (error) return <p>{error}</p>

  if (isLoading) return <Loading />

  if (!playerData) return <p>No player information found</p>

  const { Salary, BirthState, Team, BirthCity, BirthCountry, BirthDate, Jersey, Position, FirstName, LastName, Weight, Experience, HighSchool, College, Height } = playerData ?? {}

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

  return (
    <div>
      <div className='player-header'>
        <PlayerPhoto photoUrl={photoUrl} altText={`${FirstName} ${LastName}`} data={playerData} />
        <div className='player-vitals'>
          <div>
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
                <span className="vital-value vital-value--muted">Unavailable</span>
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