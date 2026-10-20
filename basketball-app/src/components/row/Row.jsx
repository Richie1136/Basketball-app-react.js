import './Row.css'
import { Link } from 'react-router-dom'

const Row = ({ ...props }) => {

  const {
    AwayLosses, AwayWins, City, ConferenceLosses, ConferenceWins, DivisionLosses,
    DivisionWins, GamesBack, HomeLosses, HomeWins, Key, LastTenLosses, LastTenWins,
    Losses, Name, Percentage, PointsPerGameAgainst, PointsPerGameFor, StreakDescription,
    Wins, rank
  } = props ?? {}

  const gamesPlayed = Number(Wins) + Number(Losses)

  const convertPercentage = gamesPlayed > 0 ? (Number(Wins) / gamesPlayed).toFixed(3).replace(/^0/, '') : ".000"
  const pointsScored = Number(PointsPerGameFor).toFixed(1)
  const OpponentsScored = Number(PointsPerGameAgainst).toFixed(1)
  const pointDiff = (pointsScored - OpponentsScored).toFixed(1)

  const pointDiffAsANumber = Number(pointDiff)

  const gamesBack = Number(GamesBack) === 0 ? '-' : Number(GamesBack).toFixed(1)

  return (
    <tr className='stats-standings'>
      <td className='city-name'><span className='rank-number'>{rank}.</span><Link to={`/${Key}`}>{City} {Name}</Link></td>
      <td>{Wins}</td>
      <td>{Losses}</td>
      <td>{convertPercentage}</td>
      <td>{gamesBack}</td>
      <td>{ConferenceWins}-{ConferenceLosses}</td>
      <td>{DivisionWins}-{DivisionLosses}</td>
      <td>{pointsScored}</td>
      <td>{OpponentsScored}</td>
      <td className={`${pointDiffAsANumber === 0 ? 'Neutral' : pointDiffAsANumber > 0 ? 'Positive' : 'Negative'}`}>{pointDiffAsANumber > 0 ? `+${pointDiff}` : pointDiff}</td>
      <td>{HomeWins}-{HomeLosses}</td>
      <td>{AwayWins}-{AwayLosses}</td>
      <td>{LastTenWins}-{LastTenLosses}</td>
      <td>{StreakDescription}</td>
    </tr>
  )
}

export default Row