import { DI } from "../..";
import { User } from "../entities/User.entity";
import { IdParams } from "../interfaces/IdParams";
import { UserLoginOrCreateRequestBody, UserQuery } from "../schemas/User.schema";

export const UserService = {
    getMany: async (query: UserQuery) => {
        const data = await DI.em.find(User, query)
        return data
    },
    getOne: async (id: IdParams) => {
        const data = await DI.em.findOne(User, id)
        return data
    },
    loginOrCreate: async ({ name, password, meeting }: UserLoginOrCreateRequestBody) => {
        // Check if user exists
        const user = await DI.em.findOne(User, { name: name, meeting: meeting })

        // User exists - log the user in
        if (user !== null) {
            if (user.password === password) {
                return user
            }
            else {
                throw new Error('User not authorized')
            }
        }
        // User does not exist - create the user
        else {
            const user = DI.em.create(User, { name, password, meeting })
            await DI.em.persistAndFlush(user)
            return user
        }
    },
}