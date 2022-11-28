import './Row.css'

const Row = ({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => {
  let posorNegStreak = Streak < 1 ? "L" + Streak.toString().split("")[1] : "W" + Streak
  let convertPercentage = "." + Percentage.toFixed(3).split(".")[1]


  return (
    <tbody>
      <tr className='stats-standings'>
        <td className='city-name'>{City} {Name}</td>
        <td className='team-winorl'>{Wins}</td>
        <td className='team-winorl'>{Losses}</td>
        <td className='winper'>{convertPercentage}</td>
        <td className='gamesback'>{GamesBack === 0 ? '-' : GamesBack}</td>
        <td className='conrecord'>{ConferenceWins}-{ConferenceLosses}</td>
        <td className='divrecord'>{DivisionWins}-{DivisionLosses}</td>
        <td className='home'>{HomeWins}-{HomeLosses}</td>
        <td className='road'>{AwayWins}-{AwayLosses}</td>
        <td className='last10'>{LastTenWins}-{LastTenLosses}</td>
        <td className='streak'>{posorNegStreak}</td>
      </tr>
    </tbody>
  )
}

export default Row