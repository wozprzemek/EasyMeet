import { wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../..";
import { Meeting } from "../entities/Meeting.entity";
import { User } from "../entities/User.entity";
import { User as TUser } from "../types/User";

export const UserController = {
    getMany: async (req: Request, res: Response) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const result = await DI.em.find(User, {})
                res.send(result)
            }
            else {
                let filter: {username?: any} = {}
                if (req.query.username) {
                    filter = {username: req.query.username}
                }
                const result = await DI.em.find(User, filter, {populate: ['availabilities']})
                res.send(result)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(User, {id: req.params.id as string}, {populate: ['availabilities']})
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const data = req.body as TUser
            const user = DI.em.create(User, data)
            console.log(user);
            
            await DI.em.persistAndFlush(user);
            
            res.send(user.id)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const data = req.body as TUser
            const user = await DI.em.findOneOrFail(User, {id: req.params.id}, {populate: ['availabilities']});

            wrap(user).assign(data);
            await DI.em.flush();
            res.send(user)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const user = DI.em.getReference(User, req.params.id);
            console.log(user);
            await DI.em.remove(user).flush();  
            res.send(user)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
}