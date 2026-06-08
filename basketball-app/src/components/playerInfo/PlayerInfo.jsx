import './PlayerInfo.css'
import { averagePlayerPercentage, averagePlayerStats } from '../../utils/helperFunctions'


const tableHeaders = [
  'Season',
  'Games Played',
  'Team',
  'Minutes Per Game',
  'Points Per Game',
  'Rebounds Per Game',
  'Assists Per Game',
  'Steals Per Game',
  'Blocks Per Game',
  'Field Goal Percentage',
  'Three Point Percentage',
  'Free Throw Percentage',
  'Turnovers Per Game',
  'Fouls Per Game'
]


const PlayerInfo = ({ data = [], points = 0, seasons = [], minutes = 0, games = 0, rebounds = 0, assists = 0, steals = 0, blocks = 0, turnovers = 0, fouls = 0, fieldGoal = 0, threePoint = 0, freeThrow = 0 }) => (
  <div className="stats-container">
    <table className="stats-table">
      <thead>
        <tr>
          {tableHeaders?.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((yearlyStats, index) => {
          const { points = 0, games = 0, assists = 0, fieldPercent = 0, team = '', ftPercent = 0, blocks = 0, minutesPg = 0, personalFouls = 0,
            steals = 0, threePercent = 0, totalRb = 0, turnovers = 0, season = '' } = yearlyStats || {}
          const teamDisplay = team === '2TM' ? 'TOT' : team;

          return (
            <tr key={`${team}-${index}`} className="playerStatSection">
              <td className="season-year">{season}</td>
              <td className="players-Average">{games}</td>
              <td className='players-Average'>{teamDisplay}</td>
              <td className="players-Average">{averagePlayerStats(minutesPg, games)}</td>
              <td className="players-Average">{averagePlayerStats(points, games)}</td>
              <td className="players-Average">{averagePlayerStats(totalRb, games)}</td>
              <td className="players-Average">{averagePlayerStats(assists, games)}</td>
              <td className="players-Average">{averagePlayerStats(steals, games)}</td>
              <td className="players-Average">{averagePlayerStats(blocks, games)}</td>
              <td className="players-Average">{averagePlayerPercentage(fieldPercent)}</td>
              <td className="players-Average">{averagePlayerPercentage(threePercent)}</td>
              <td className="players-Average">{averagePlayerPercentage(ftPercent)}</td>
              <td className="players-Average">{averagePlayerStats(turnovers, games)}</td>
              <td className="players-Average">{averagePlayerStats(personalFouls, games)}</td>
            </tr>
          )
        })}
        {/* Career Averages Row */}
        <tr>
          <td className='season-year' style={{ fontWeight: 700 }}>{seasons.length} seasons</td>
          <td className="players-Average">{games}</td>
          <td className="career-Averages" style={{ whiteSpace: 'break-spaces', fontSize: '16px', fontWeight: 'bold' }}>Career Averages</td>
          <td className="players-Average">{averagePlayerStats(minutes, games)}</td>
          <td className="players-Average">{averagePlayerStats(points, games)}</td>
          <td className="players-Average">{averagePlayerStats(rebounds, games)}</td>
          <td className="players-Average">{averagePlayerStats(assists, games)}</td>
          <td className="players-Average">{averagePlayerStats(steals, games)}</td>
          <td className="players-Average">{averagePlayerStats(blocks, games)}</td>
          <td className="players-Average">{averagePlayerPercentage(fieldGoal)}</td>
          <td className="players-Average">{averagePlayerPercentage(threePoint)}</td>
          <td className="players-Average">{averagePlayerPercentage(freeThrow)}</td>
          <td className="players-Average">{averagePlayerStats(turnovers, games)}</td>
          <td className="players-Average">{averagePlayerStats(fouls, games)}</td>
        </tr>
      </tbody>
    </table>
  </div>

)

export default PlayerInfo
