import { getBBRefPhotoUrl } from "../playerPhotoUtils"

export const computePlayerPhotoUrl = (data) => {
    if (data.FirstName && data.LastName) {
        const firstName = data.FirstName
        const lastName = data.LastName

        const BBRefPhoto = getBBRefPhotoUrl(firstName, lastName)
        return BBRefPhoto
    }

    return data.PhotoUrl || null
}