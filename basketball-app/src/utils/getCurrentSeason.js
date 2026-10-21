export const getCurrentSeason = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // If month is October, which is when the nba starts then i want it to go to the next year

  return month >= 10 ? year + 1 : year
}

export const getAllowedSeasons = () => {
  const currentSeason = getCurrentSeason()

  return Array.from(
    { length: currentSeason - 2025 + 1 },
    (_, index) => String(currentSeason - index)
  )
}