export const computeWeightMetrics = (weightInPounds) => {
    if (!weightInPounds && weightInPounds !== 0) {
        return {
            weightKg: 0,
            weightKgLength: 0,
        }
    }

    const weightKg = Math.round(weightInPounds / 2.2046)
    const weightKgLength = weightKg.toString().length

    return {
        weightKg,
        weightKgLength,
    }
}
