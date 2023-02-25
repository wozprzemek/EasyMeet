import { axios } from "config/axios";
import { Meeting } from "features/CreateMeeting/types";

// interface ICreateMeeting extends Meeting{
//     dates: 
// }

export const createMeeting = async (meeting: Meeting) => {
    const dates = meeting.dates.map((date) => {
        return {
            date: `${date.year}-${date.month}-${date.day}`
        }
    })

    const data = {
        name: meeting.name,
        password: meeting.password,
        from: meeting.from,
        to: meeting.to,
        dates: dates,
        active: true,
    }

    const response = await axios.post("/meetings/", data)
    .then((e) => { return e })
    .catch((e) => { return e })

    console.log(response);
    

    return response.data
}