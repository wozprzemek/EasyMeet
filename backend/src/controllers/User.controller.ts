import { Request, Response } from "express";
import { DI } from "../..";
import { Meeting } from "../entities/Meeting.entity";
import { User } from "../entities/User.entity";
import { UserLoginOrCreateRequestBody, UserQuery } from "../schemas/User.schema";
import { UserService } from "../services/User.service";
import { IdParams } from "../interfaces/IdParams";

export const UserController = {
    getMany: async (req: Request<{}, User[], {}, UserQuery>, res: Response<User[]>) => {
        try {
            const { name, meeting } = req.query
            const query = {
                ...(name && { name: name }),
                ...(meeting && { meeting: meeting })
            }
            const users = await UserService.getMany(query)
            res.send(users)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getOne: async (req: Request<IdParams, User, {}, {}>, res: Response<User | null>) => {
        try {
            const id = req.params.id
            const user = await UserService.getOne({ id: id })
            res.send(user)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    loginOrCreate: async (req: Request<{}, User, UserLoginOrCreateRequestBody, {}>, res: Response<User>) => {
        try {
            const { name, password, meeting } = req.body
            const user = await UserService.loginOrCreate({ name, password, meeting })
            res.send(user)
        } catch (error) {
            res.sendStatus(500)
        }
    },
}