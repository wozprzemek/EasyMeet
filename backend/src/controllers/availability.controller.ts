import { wrap } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { Meeting } from "../entities/Meeting.entity";

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
    },
    add: async (req: Request, res: Response) => {
        try {
            const data: {meeting_id: string, availabilities: Availability[]} = req.body

            const meeting = await DI.em.findOneOrFail(Meeting, data.meeting_id)

            data.availabilities.forEach(item => {
                const availability = DI.em.create(Availability, item)
                meeting.availabilities.add(availability)
            });

            await DI.em.persistAndFlush(meeting);
            
            res.send(meeting)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     console.log(req.params.id);
        //     const author = await DI.em.findOneOrFail(Meeting, {id: req.params.id});
        //     wrap(author).assign(req.body);
        //     await DI.em.flush();
        //     res.send('updated a meeting')
        // } catch (error) {
        //     console.error(error);
        //     res.sendStatus(500)
        // }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const meeting = DI.em.getReference(Meeting, req.params.id);
        //     console.log(meeting);
        //     // await DI.em.nativeDelete(Meeting,)
        //     await DI.em.remove(meeting).flush();  
        //     res.send('deleted a meeting')
        // } catch (error) {
        //     console.error(error);
        //     res.sendStatus(500)
        // }
    },
}