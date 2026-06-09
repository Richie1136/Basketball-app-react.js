import './Row.css'
import { Link } from 'react-router-dom'

const Row = ({ ...props }) => {

  const {
    AwayLosses, AwayWins, City, ConferenceLosses, ConferenceWins, DivisionLosses,
    DivisionWins, GamesBack, HomeLosses, HomeWins, Key, LastTenLosses, LastTenWins,
    Losses, Name, Percentage, PointsPerGameAgainst, PointsPerGameFor, StreakDescription,
    Wins, rank
  } = props

  const convertPercentage = Percentage.toFixed(3).replace(/^0/, '')
  const pointsScored = Number(PointsPerGameFor).toFixed(1)
  const OpponentsScored = Number(PointsPerGameAgainst).toFixed(1)
  const pointDiff = (pointsScored - OpponentsScored).toFixed(1)

  const pointDiffAsANumber = Number(pointDiff)

  const gamesBack = Number(GamesBack) === 0 ? '-' : Number(GamesBack).toFixed(1)

  return (
    <tr className='stats-standings'>
      <td className='city-name'><span className='rank-number'>{rank}.</span><Link to={`/${Key}`}>{City} {Name}</Link></td>
      <td className='team-win'>{Wins}</td>
      <td className='team-lose'>{Losses}</td>
      <td className={Losses === 0 ? 'oneHundred' : 'winper'}>{Losses === 0 ? '1' + convertPercentage : convertPercentage}</td>
      <td className='gamesback'>{gamesBack}</td>
      <td className='conrecord'>{ConferenceWins}-{ConferenceLosses}</td>
      <td className='divrecord'>{DivisionWins}-{DivisionLosses}</td>
      <td className='pointsFor'>{pointsScored}</td>
      <td className='pointsAgainst'>{OpponentsScored}</td>
      <td className={`${pointDiffAsANumber === 0 ? 'Neutral' : pointDiffAsANumber > 0 ? 'Positive' : 'Negative'}`}>{pointDiffAsANumber > 0 ? `+${pointDiff}` : pointDiff}</td>
      <td className='home'>{HomeWins}-{HomeLosses}</td>
      <td className='road'>{AwayWins}-{AwayLosses}</td>
      <td className='last10'>{LastTenWins}-{LastTenLosses}</td>
      <td className='streak'>{StreakDescription}</td>
    </tr>
  )
}

export default Row