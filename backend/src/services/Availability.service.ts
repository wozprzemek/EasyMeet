import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { User } from "../entities/User.entity";
import { AvailabilityQuery, AvailabilityUpdateRequestBody } from "../schemas/Availability.schema";
import { IdParams } from "../schemas/IdParams";

export const AvailabilityService = {
    getMany: async (query: AvailabilityQuery) => {
        const data = await DI.em.find(Availability, query)
        return data
    },
    getOne: async (id: IdParams) => {
        const data = await DI.em.findOne(Availability, id)
        return data
    },
    updateUserAvailabilities: async ({user, password, availabilities}: AvailabilityUpdateRequestBody) => {
        // get the user ----- MOVE TO USER SERVICE
        const userInfo = await DI.em.findOne(User, { id: user, password: password })
        if (!userInfo) {
            throw new Error('User not authorized')
        }
        // get the user availabilities
        const userAvailabilities = await DI.em.find(Availability, { user: user })
        // clear the user availabilities
        userAvailabilities.forEach(async (availability) => {
            await DI.em.remove(availability).flush();
        })
        // persist new user availabilities
        availabilities.forEach(async (availability) => {
            const newAvailability = DI.em.create(Availability, { ...availability, user: user })
            await DI.em.persistAndFlush(newAvailability)
        })
    },

}