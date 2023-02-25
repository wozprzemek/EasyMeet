import { axios } from "config/axios"

export const getMeeting = async (id: string | undefined) => {
    const response = await axios.get(`/meetings/${id}`)
    .then(e => e)
    .catch(e => e)

    return response.data
}