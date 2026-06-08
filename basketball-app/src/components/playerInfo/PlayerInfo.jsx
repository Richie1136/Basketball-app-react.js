import './PlayerInfo.css'
import { averagePlayerPercentage, averagePlayerStats } from '../../utils/helperFunctions'

const PlayerInfo = ({ data = [], points = 0, seasons = [], minutes = 0, games = 0, rebounds = 0, assists = 0, steals = 0, blocks = 0, turnovers = 0, fouls = 0, fieldGoal = 0, threePoint = 0, freeThrow = 0}) => (
  <div className="stats-container">
    <table className="stats-table">
      <thead>
        <tr>
          <th>Season</th>
          <th>Games{'\n'} Played</th>
          <th>Team</th>
          <th>Minutes{'\n'} Per Game</th>
          <th>Points{'\n'} Per Game</th>
          <th>Rebounds{'\n'} Per Game</th>
          <th>Assists{'\n'} Per Game</th>
          <th>Steals{'\n'} Per Game</th>
          <th>Blocks{'\n'} Per Game</th>
          <th>Field Goal Percentage</th>
          <th>Three Point Percentage</th>
          <th>Free Throw Percentage</th>
          <th>Turnovers{'\n'} Per Game</th>
          <th>Fouls{'\n'} Per Game</th>
        </tr>
      </thead>
      {data?.map((yearlyStats, index) => {
        const { points = 0, games = 0, assists = 0, fieldPercent = 0, team = '', ftPercent = 0, blocks = 0, minutesPg = 0, personalFouls = 0, 
          steals = 0, threePercent = 0, totalRb = 0, turnovers = 0, season = '' } = yearlyStats || {}
        const teamDisplay = team === '2TM' ? 'TOT' : team;

        return (
          <>
          <tr key={index} className="playerStatSection">
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
          </>
        )
      })}
        {/* Career Averages Row */}
          <tr>
            <td className='season-year' style={{fontWeight: 700}}>{seasons.length} seasons</td>
            <td className="players-Average">{games}</td>
            <td className="season-year" style={{whiteSpace: 'break-spaces', fontSize: '16px', fontWeight: 'bold'}}>Career Averages</td>
            <td className="players-Average">{averagePlayerStats(minutes, games)}</td>
            <td className='players-Average'>{averagePlayerStats(points, games)}</td>
            <td className='players-Average'>{averagePlayerStats(rebounds, games)}</td>
            <td className='players-Average'>{averagePlayerStats(assists, games)}</td>
            <td className='players-Average'>{averagePlayerStats(steals, games)}</td>
            <td className='players-Average'>{averagePlayerStats(blocks, games)}</td>
            <td className='players-Average'>{averagePlayerPercentage(fieldGoal)}</td>
            <td className='players-Average'>{averagePlayerPercentage(threePoint)}</td>
            <td className='players-Average'>{averagePlayerPercentage(freeThrow)}</td>
            <td className='players-Average'>{averagePlayerStats(turnovers, games)}</td>
            <td className='players-Average'>{averagePlayerStats(fouls, games)}</td>
          </tr>
    </table>
  </div>
  
)

export default PlayerInfo
