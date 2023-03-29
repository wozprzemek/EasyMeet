import { axios } from "config/axios";

export const loginOrCreateUser = async (name: string, password: string, meetingId: string | undefined) => {
    const data = {
        name: name,
        password: password,
        meeting: meetingId
    }

    const response = await axios.post("/users/", data)
        .then((e) => { return e })
        .catch((e) => { return e })

    return response.data
}