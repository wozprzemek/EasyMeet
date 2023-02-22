import { wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../..";
import { Meeting } from "../entities/Meeting.entity";
import { Meeting as TMeeting } from "../types/Meeting";

export const MeetingController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.find(Meeting, {}, { populate: ['dates'] })
            res.send(result)
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(Meeting, {id: req.params.id}, { populate: ['dates'] })
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const data = req.body as TMeeting
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
            const data = req.body as TMeeting
            const meeting = await DI.em.findOneOrFail(Meeting, {id: req.params.id}, {populate: ['dates']});

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