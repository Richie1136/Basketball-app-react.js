import './Row.css'

const Row = ({ City, Name, Losses, Wins, Percentage, GamesBack, ConferenceWins, PointsPerGameFor,
  PointsPerGameAgainst, ConferenceLosses, DivisionWins, DivisionLosses, HomeWins, HomeLosses, AwayWins, AwayLosses, LastTenWins, LastTenLosses, Streak }) => {
  let posorNegStreak = Streak < 1 ? "L" + Streak.toString().split("")[1] : "W" + Streak
  let convertPercentage = "." + Percentage.toFixed(3).split(".")[1]

  // console.log(PointsPerGameFor.toString().split("")[4])

  // console.log(PointsPerGameFor.toString().split(" ")[4] === "0" ? "0" + PointsPerGameFor.pop() : PointsPerGameFor)

  let result = PointsPerGameFor.toString().split("")[4] === "0" ? PointsPerGameFor.toString().slice(0, -1) : Math.round(PointsPerGameFor * 10) / 10

  let pointsScored = Math.round(PointsPerGameFor * 10) / 10
  let OpponentsScored = Math.round(PointsPerGameAgainst * 10) / 10

  // let j = result
  // console.log(typeof Number(result))

  console.log(PointsPerGameAgainst.toFixed(2))

  let pointDiff = (pointsScored - OpponentsScored).toFixed(1)
  console.log(pointDiff > 0)


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
        <td className='pointsFor'>{pointsScored}</td>
        <td className='pointsAgainst'>{OpponentsScored}</td>
        <td className={`${pointDiff > 0 ? 'Positive' : 'Negative'}`}>{pointDiff > 0 ? "+" + (pointDiff) : pointDiff}</td>
        <td className='home'>{HomeWins}-{HomeLosses}</td>
        <td className='road'>{AwayWins}-{AwayLosses}</td>
        <td className='last10'>{LastTenWins}-{LastTenLosses}</td>
        <td className='streak'>{posorNegStreak}</td>
      </tr>
    </tbody>
  )
}

export default Row