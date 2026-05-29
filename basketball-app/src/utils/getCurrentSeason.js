export const useCurrentSeason = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // If month is October, which is when the nba starts then i want it to go to the next year

  const season = month >= 10 ? year + 1 : year
  return season
}