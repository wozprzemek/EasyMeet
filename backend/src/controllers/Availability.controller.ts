import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";

export const AvailabilityController = {
    getMany: async (req: Request, res: Response) => {
        try {
            if (!req.query) {
                const result = await DI.em.find(Availability, {})
                res.send(result)
            }
            else {
                let filter: {time?: any, meeting?: any} = {}
                if (req.query.meeting_id && req.query.date) {
                    filter = {meeting: req.query.meeting_id, time: req.query.time}
                }
                else {
                    if (req.query.meeting_id) {
                        filter = {meeting: req.query.meeting_id}
                    }
                    else if(req.query.time) {
                        filter = {time: req.query.time}
                    }
                }
                const result = await DI.em.find(Availability, filter)
                res.send(result)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(Availability, {id: req.params.id as string})
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }
}