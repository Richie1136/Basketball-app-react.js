export const grabPlayerStats = (playerStats) => {
  let totals = {
    games: 0,
    minutes: 0,
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    fouls: 0,
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    threeMade: 0,
    threeAttempted: 0,
    ftMade: 0,
    ftAttempted: 0,
  };

  playerStats.forEach((stat) => {
    if (stat.TEAM_ABBREVIATION !== 'TOT') { // ignore 'TOT' entries if needed
      totals.games += stat.GP ?? 0;
      totals.minutes += stat.MIN ?? 0;
      totals.points += stat.PTS ?? 0;
      totals.rebounds += stat.REB ?? 0;
      totals.assists += stat.AST ?? 0;
      totals.steals += stat.STL ?? 0;
      totals.blocks += stat.BLK ?? 0;
      totals.turnovers += stat.TOV ?? 0;
      totals.fouls += stat.PF ?? 0;
      totals.fieldGoalsMade += stat.FGM ?? 0;
      totals.fieldGoalsAttempted += stat.FGA ?? 0;
      totals.threeMade += stat.FG3M ?? 0;
      totals.threeAttempted += stat.FG3A ?? 0;
      totals.ftMade += stat.FTM ?? 0;
      totals.ftAttempted += stat.FTA ?? 0;
    }
  });

  return {
    ...totals,
    fieldGoalPct:
      totals.fieldGoalsAttempted > 0
        ? totals.fieldGoalsMade / totals.fieldGoalsAttempted
        : 0,
    threePct:
      totals.threeAttempted > 0 ? totals.threeMade / totals.threeAttempted : 0,
    freeThrowPct:
      totals.ftAttempted > 0 ? totals.ftMade / totals.ftAttempted : 0,
  };
};
