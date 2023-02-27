import { axios } from "config/axios"
import { Meeting } from "types/Meeting"

interface IUpdateMeeting extends Partial<Meeting> {}

export const updateMeeting = async (id: string | undefined, data: IUpdateMeeting) => {
    const response = await axios.patch(`/meetings/${id}`, data)
    .then(e => e)
    .catch(e => e)

    return response.data    
}