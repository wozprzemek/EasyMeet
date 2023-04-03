import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { User } from "../entities/User.entity";
import { AvailabilityQuery } from "../schemas/Availability.schema";
import { AvailabilityService } from "../services/Availability.service";

export const AvailabilityController = {
    getMany: async (req: Request<{}, Availability[], {}, AvailabilityQuery>, res: Response<Availability[]>) => {
        try {
            const { user, time } = req.query
            const query = {
                ...(user && {user: user}),
                ...(time && {time: time})
            }
            const data = await AvailabilityService.getMany(query)
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const data = await AvailabilityService.getOne(id)
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    updateUserAvailabilities: async (req: Request, res: Response) => {
        const data: { user: User, availabilities: Availability[] } = req.body
        try {
            const query = await DI.em.find(Availability, { user: data.user })

            // remove all user availabilities in a meeting
            query.forEach(async (availability) => {
                await DI.em.remove(availability).flush();
            })
            data.availabilities.forEach(async (availability) => {
                const newAvailability = DI.em.create(Availability, { ...availability, user: data.user })
                await DI.em.persistAndFlush(newAvailability)
            })
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}