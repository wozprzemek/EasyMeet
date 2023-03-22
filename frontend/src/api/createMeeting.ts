import { axios } from "config/axios";
import { Meeting } from "views/CreateMeeting/types";
import moment from "moment";

export const createMeeting = async (meeting: Meeting) => {
    const dates = meeting.dates.map((date) => {
        return {
            date: `${date.year}-${date.month}-${date.day}`
        }
    })

    dates.sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : 0)

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


    return response.data
}