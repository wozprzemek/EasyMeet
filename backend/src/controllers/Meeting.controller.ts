import { DateTimeType, wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { Meeting } from "../entities/Meeting.entity";
import { MeetingDate } from "../entities/MeetingDate.entity";

export const MeetingController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.find(Meeting, {})
            res.send(result)
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(Meeting, {id: req.params.id}, { populate: ['dates', 'availabilities'] })
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const data : {name: string, password: string, dates: MeetingDate[], from: DateTimeType, to: DateTimeType, active: boolean} = req.body
            const meeting = DI.em.create(Meeting, data)

            await DI.em.persistAndFlush(meeting)
            res.send(meeting.id)
        } catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const data: {name?: string, password?: string, dates?: MeetingDate[], availabilities?: Availability[], from?: DateTimeType, to?: DateTimeType, active?: boolean} = req.body
            const meeting = await DI.em.findOneOrFail(Meeting, {id: req.params.id}, {populate: ['dates', 'availabilities']});

            wrap(meeting).assign(data);
            await DI.em.flush();
            res.send(meeting)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const meeting = DI.em.getReference(Meeting, req.params.id);
            console.log(meeting);
            await DI.em.remove(meeting).flush();  
            res.send('deleted a meeting')
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
}