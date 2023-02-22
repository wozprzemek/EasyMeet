import { DI } from "../.."
import { User } from "../entities/User.entity"
import { User as TUser } from "../types/User"

export const UserController = {
    getAll: async () => {
        return await DI.em.find(User, {})
    },
    getOne: async (id: string) => {
        return await DI.em.findOne(User, {id: id})
    },
    add: async (user: TUser) => {
        return 
    },
    // update: (req: Request, res: Response, next: NextFunction) => {
    //     res.send('users patch')
    // },
    // delete: (req: Request, res: Response, next: NextFunction) => {
    //     res.send('users delete')
    // },
}