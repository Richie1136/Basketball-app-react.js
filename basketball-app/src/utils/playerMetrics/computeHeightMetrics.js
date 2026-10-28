export const computeHeightMetrics = (heightInInches) => {
    if (!heightInInches && heightInInches !== 0) {
        return {
            feet: '',
            inches: '',
            metersValue: 0,
        }
    }

    const feet = Math.floor(heightInInches / 12)
    const inches = heightInInches % 12
    const metersValue = heightInInches * 0.0254

    return {
        feet,
        inches,
        metersValue,
    }
}