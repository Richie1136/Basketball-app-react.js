import React from 'react'
import './PlayerInfo.css'

const PlayerInfo = ({ data }) => (
  <div className="stats-container">
    <table className="stats-table">
      <thead>
        <tr>
          <th>Season</th>
          <th>Games{'\n'} Played</th>
          <th>Minutes{'\n'} Per Game</th>
          <th>Points{'\n'} Per Game</th>
          <th>Rebounds{'\n'} Per Game</th>
          <th>Assists{'\n'} Per Game</th>
          <th>Steals{'\n'} Per Game</th>
          <th>Blocks{'\n'} Per Game</th>
          <th>Turnovers{'\n'} Per Game</th>
          <th>Field Goal Percentage</th>
          <th>Three Point Percentage</th>
          <th>Free Throw Percentage</th>
          <th>Fouls{'\n'} Per Game</th>
        </tr>
      </thead>

      {data?.map((yearlyStats, index) => {
        console.log(yearlyStats)
        const { points, games, assists, fieldPercent, ftPercent, blocks, minutesPg, personalFouls, steals, threePercent, totalRb, turnovers, season } = yearlyStats || {}
        let gamesPlayedIn = games
        let minutesPerGame = (minutesPg / games).toFixed(1)
        let scoringAverage = (points / games).toFixed(1)
        let reboudAverage = (totalRb / games).toFixed(1)
        let assistAverage = (assists / games).toFixed(1)
        let stealsAverage = (steals / games).toFixed(1)
        let blockAverage = (blocks / games).toFixed(1)
        let turnoversAverage = (turnovers / games).toFixed(1)
        let fieldGoalPercenrage = (fieldPercent * 100).toFixed(1)
        let threePointPercentage = (threePercent * 100).toFixed(1)
        let freeThrowPercentage = (ftPercent * 100).toFixed(1)
        let foulsAverage = (personalFouls / games).toFixed(1)


        return (
          <tr key={index} className="playerStatSection">
            <td className="season-year">{season}</td>
            <td className="players-Average">{gamesPlayedIn}</td>
            <td className="players-Average">{minutesPerGame}</td>
            <td className="players-Average">{scoringAverage}</td>
            <td className="players-Average">{reboudAverage}</td>
            <td className="players-Average">{assistAverage}</td>
            <td className="players-Average">{stealsAverage}</td>
            <td className="players-Average">{blockAverage}</td>
            <td className="players-Average">{turnoversAverage}</td>
            <td className="players-Average">{fieldGoalPercenrage}</td>
            <td className="players-Average">{threePointPercentage}</td>
            <td className="players-Average">{freeThrowPercentage}</td>
            <td className="players-Average">{foulsAverage}</td>
          </tr>
        )
      })}

    </table>
  </div>
)

export default PlayerInfo