export const grabPlayerStats = (playerStats = []) => {
  let minutes = 0
  let careerGames = 0
  let totalPoints = 0
  let totalRebounds = 0
  let totalAssists = 0
  let totalSteals = 0
  let totalBlocks = 0
  let totalTurnovers = 0
  let totalFouls = 0
  let totalFieldGoalsMade = 0
  let totalFieldGoalsAttempted = 0
  let totalFtMake = 0
  let totalFtAttempted = 0
  let total3PointMade = 0
  let total3PointAttempted = 0

  for (let i = 0; i < playerStats.length; i++) {
    const stats = playerStats[i];
    if (stats.team !== 'TOT') {
      const { minutesPg, games, points, fieldGoals, fieldAttempts, ft, ftAttempts, threeFg, threeAttempts, totalRb, assists, steals,
        blocks, turnovers, personalFouls
      } = stats
      // Default missing stat value to 0 
      minutes += minutesPg ?? 0;
      careerGames += games ?? 0;
      totalPoints += points ?? 0;
      totalFieldGoalsMade += fieldGoals ?? 0;
      totalFieldGoalsAttempted += fieldAttempts ?? 0;
      totalFtMake += ft ?? 0
      totalFtAttempted += ftAttempts ?? 0
      total3PointMade += threeFg ?? 0
      total3PointAttempted += threeAttempts ?? 0
      totalRebounds += totalRb ?? 0;
      totalAssists += assists ?? 0;
      totalSteals += steals ?? 0;
      totalBlocks += blocks ?? 0;
      totalTurnovers += turnovers ?? 0;
      totalFouls += personalFouls ?? 0;
    }
  }
  return {
    minutes,
    careerGames,
    totalPoints,
    totalRebounds,
    totalAssists,
    totalSteals,
    totalBlocks,
    totalTurnovers,
    totalFouls,
    careerFgPercent: totalFieldGoalsAttempted > 0 ? totalFieldGoalsMade / totalFieldGoalsAttempted : 0,
    careerFtPercent: totalFtAttempted > 0 ? totalFtMake / totalFtAttempted : 0,
    careerThreePercent: total3PointAttempted > 0 ? total3PointMade / total3PointAttempted : 0
  }
};
