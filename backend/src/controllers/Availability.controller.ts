import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { AvailabilityQuery, AvailabilityResponse, AvailabilityUpdateRequestBody } from "../schemas/Availability.schema";
import { IdParams } from "../interfaces/IdParams";
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
    getOne: async (req: Request<IdParams, Availability, {}, {}>, res: Response<Availability | null>) => {
        try {
            const id = req.params.id
            const data = await AvailabilityService.getOne({id : id})
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    updateUserAvailabilities: async (req: Request<{}, {}, AvailabilityUpdateRequestBody, {}>, res: Response) => {
        const {user, password, availabilities} = req.body
        try {
            AvailabilityService.updateUserAvailabilities({user, password, availabilities})
            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}