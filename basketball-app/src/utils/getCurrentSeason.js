export const getCurrentSeason = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1

  // Seasons use their ending year: October 2025 starts the 2026 season.

  return month >= 10 ? year + 1 : year
}

export const getAllowedSeasons = () => {
  const currentSeason = getCurrentSeason()

  // The season selector supports ending years from 2025 onward, newest first.
  return Array.from(
    { length: currentSeason - 2025 + 1 },
    (_, index) => String(currentSeason - index)
  )
}