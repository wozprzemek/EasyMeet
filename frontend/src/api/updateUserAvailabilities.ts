import { axios } from "config/axios"
import { Availability } from "types/Availability"

interface IUpdateAvailabilities {
    meeting: string;
    user: string;
    availabilities: Availability[];
}

export const updateAvailabilities = async (data: IUpdateAvailabilities) => {
    console.log(data);

    const response = await axios.put(`/availabilities`, data, {
        params: {
            meeting: data.meeting,
            user: data.user
        }
    })
        .then(e => e)
        .catch(e => e)

    return response.data
}