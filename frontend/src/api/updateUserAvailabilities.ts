import { axios } from "config/axios"
import { Availability } from "types/Availability"

interface IUpdateAvailabilities {
    user: string;
    availabilities: Availability[];
}

export const updateAvailabilities = async (data: IUpdateAvailabilities) => {
    const response = await axios.put(`/availabilities/`, data)
        .then(e => e)
        .catch(e => e)

    return response.data
}