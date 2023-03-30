import { wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { Meeting } from "../entities/Meeting.entity";
import { User } from "../entities/User.entity";

export const UserController = {
    getMany: async (req: Request, res: Response) => {
        try {
            if (!req.query) {
                const result = await DI.em.find(User, {})
                res.send(result)
            }
            else {
                let filter: { time?: any, meeting?: any } = {}
                if (req.query.meeting_id && req.query.date) {
                    filter = { meeting: req.query.meeting_id, time: req.query.time }
                }
                else {
                    if (req.query.meeting_id) {
                        filter = { meeting: req.query.meeting_id }
                    }
                    else if (req.query.time) {
                        filter = { time: req.query.time }
                    }
                }
                const result = await DI.em.find(User, filter)
                res.send(result)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(User, { id: req.params.id as string }, { populate: ['availabilities'] })
            res.send(result)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
    loginOrCreate: async (req: Request, res: Response) => {
        try {
            const data: { name: string, password: string, meeting: Meeting } = req.body
            const user = await DI.em.findOne(User, { name: data.name, meeting: data.meeting })
            console.log(user);

            // User exists - log the user in
            if (user !== null) {
                if (user.password === data.password) {
                    res.send(user)
                }
                else {
                    res.sendStatus(401)
                }
            }
            // User does not exist - create the user
            else {
                const user = DI.em.create(User, data)
                await DI.em.persistAndFlush(user)
                res.send(user)
            }

        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
    update: async (req: Request, res: Response) => {
        const data: { user: User, availabilities: Availability[] } = req.body
        try {
            const user = await DI.em.findOneOrFail(User, { id: req.params.id });

            wrap(user).assign(data);
            await DI.em.flush();
            res.send(user)
            // const query = await DI.em.find(Availability, { user: data.user }) // FIX MEETING NULL!
            // // remove all user availabilities
            // console.log('query', query);

            // query.forEach(async (availability) => {
            //     await DI.em.remove(availability).flush();
            // })
            // data.availabilities.forEach(async (availability) => {
            //     const newAvailability = DI.em.create(Availability, availability)
            //     await DI.em.persistAndFlush(newAvailability)
            // })
            // res.send(data)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
}