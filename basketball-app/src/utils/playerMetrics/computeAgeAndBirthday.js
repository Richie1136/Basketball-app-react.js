export const computeAgeAndBirthdateMetrics = (birthDateRaw) => {
    if (!birthDateRaw) {
        return {
            age: null,
            objectDate: '',
            birthDay: '',
            birthYear: '',
        }
    }

    const today = new Date()
    const birthDate = new Date(birthDateRaw)
    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    const objectDate = new Date(birthDateRaw).toLocaleDateString('en-US', {
        month: 'long',
    })

    const birthDay = birthDate.getDate()
    const birthYear = birthDate.getFullYear()

    return {
        age,
        objectDate,
        birthDay,
        birthYear
    }
}