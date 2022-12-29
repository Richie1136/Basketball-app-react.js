import './Row.css'

const Row = ({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, PointsPerGameFor,
  PointsPerGameAgainst, StreakDescription, Key, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => {
  let convertPercentage = "." + Percentage.toFixed(3).split(".")[1]

  let pointsScored = Math.round(PointsPerGameFor * 10) / 10
  let OpponentsScored = Math.round(PointsPerGameAgainst * 10) / 10
  let pointDiff = (pointsScored - OpponentsScored).toFixed(1)

  return (
    <tbody>
      <tr className='stats-standings'>
        <td className='city-name'><a href={`/${Key}`}>{City} {Name}</a></td>
        <td className='team-winorl'>{Wins}</td>
        <td className='team-winorl'>{Losses}</td>
        <td className='winper'>{convertPercentage}</td>
        <td className='gamesback'>{GamesBack === 0 ? '-' : GamesBack}</td>
        <td className='conrecord'>{ConferenceWins}-{ConferenceLosses}</td>
        <td className='divrecord'>{DivisionWins}-{DivisionLosses}</td>
        <td className='pointsFor'>{pointsScored}</td>
        <td className='pointsAgainst'>{OpponentsScored}</td>
        <td className={`${pointDiff > 0 ? 'Positive' : 'Negative'}`}>{pointDiff > 0 ? "+" + (pointDiff) : pointDiff}</td>
        <td className='home'>{HomeWins}-{HomeLosses}</td>
        <td className='road'>{AwayWins}-{AwayLosses}</td>
        <td className='last10'>{LastTenWins}-{LastTenLosses}</td>
        <td className='streak'>{StreakDescription}</td>

      </tr>
    </tbody>
  )
}

export default Row