import { DI } from "../..";
import { Meeting } from "../entities/Meeting.entity";
import { IdParams } from "../interfaces/IdParams";
import { MeetingCreateRequestBody } from "../schemas/Meeting.schema";

export const MeetingService = {
    getMany: async () => {
        const data = await DI.em.find(Meeting, {})
        return data
    },
    getOne: async (id: IdParams) => {
        const data = await DI.em.findOne(Meeting, id, { populate: ['dates.date', 'users.availabilities.time'] })
        return data
    },
    add: async ({ name, dates, from, to, active }: MeetingCreateRequestBody) => {
        const meeting = DI.em.create(Meeting, { name, dates, from, to, active })
        await DI.em.persistAndFlush(meeting)
        return meeting.id
    }
}