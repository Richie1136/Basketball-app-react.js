import './Row.css'
import { Link } from 'react-router-dom'

const Row = ({ ...props }) => {

  console.log(props)

  const {
    AwayLosses, AwayWins, City, ConferenceLosses, ConferenceWins, DivisionLosses,
    DivisionWins, GamesBack, HomeLosses, HomeWins, Key, LastTenLosses, LastTenWins,
    Losses, Name, Percentage, PointsPerGameAgainst, PointsPerGameFor, StreakDescription,
    Wins, rank
  } = props

  const convertPercentage = "." + Percentage.toFixed(3).split(".")[1]
  const pointsScored = Math.round(PointsPerGameFor * 10) / 10
  const OpponentsScored = Math.round(PointsPerGameAgainst * 10) / 10
  const pointDiff = (pointsScored - OpponentsScored).toFixed(1)
  const addZeroDecimalpointsScored = String(pointsScored).length === 3 ? pointsScored + ".0" : pointsScored
  const addZeroDecimalOpponentsScored = String(OpponentsScored).length === 3 ? OpponentsScored + ".0" : OpponentsScored
  const convertToString = String(GamesBack)
  const splitDecimal = convertToString.split(".")
  const addZeroToGamesBackIfOnlyOneNumberOr2NumbersWithNoDecimal = GamesBack.length === 1 || splitDecimal[1] === undefined ? GamesBack + ".0" : GamesBack

  return (
    <tr className='stats-standings'>
      <td className='city-name'><span style={{ marginRight: '5px' }}>{rank}.</span><Link to={`/${Key}`}>{City} {Name}</Link></td>
      <td className='team-win'>{Wins}</td>
      <td className='team-lose'>{Losses}</td>
      <td className={Losses === 0 ? 'oneHundred' : 'winper'}>{Losses === 0 ? '1' + convertPercentage : convertPercentage}</td>
      <td className='gamesback'>{GamesBack === 0 ? '-' : addZeroToGamesBackIfOnlyOneNumberOr2NumbersWithNoDecimal}</td>
      <td className='conrecord'>{ConferenceWins}-{ConferenceLosses}</td>
      <td className='divrecord'>{DivisionWins}-{DivisionLosses}</td>
      <td className='pointsFor'>{addZeroDecimalpointsScored}</td>
      <td className='pointsAgainst'>{addZeroDecimalOpponentsScored}</td>
      <td className={`${pointDiff === "0.0" ? 'Neutral' : pointDiff > 0.0 ? 'Positive' : 'Negative'}`}>{pointDiff > 0 ? "+" + (pointDiff) : pointDiff}</td>
      <td className='home'>{HomeWins}-{HomeLosses}</td>
      <td className='road'>{AwayWins}-{AwayLosses}</td>
      <td className='last10'>{LastTenWins}-{LastTenLosses}</td>
      <td className='streak'>{StreakDescription}</td>
    </tr>
  )
}

export default Row