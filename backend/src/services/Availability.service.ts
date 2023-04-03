import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { User } from "../entities/User.entity";
import { AvailabilityQuery } from "../schemas/Availability.schema";

export const AvailabilityService = {
    getMany: async (query: AvailabilityQuery) => {
        const data = await DI.em.find(Availability, query)
        return data
    },
    getOne: async (id: string) => {
        const data = await DI.em.findOne(Availability, { id: id })
    },
    validateRequestBody: async (body: any) => {
        const data: { user: User, availabilities: Availability[] } = body
    },  
}