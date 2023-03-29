import { Request, Response } from "express";
import { DI } from "../..";
import { MeetingDate } from "../entities/MeetingDate.entity";

export const MeetingDateController = {
    getMany: async (req: Request, res: Response) => {

        try {
            if (!req.query) {
                const result = await DI.em.find(MeetingDate, {})
                res.send(result)
            }
            else {
                let filter: { date?: any, meeting?: any } = {}
                if (req.query.meeting_id && req.query.date) {
                    filter = { meeting: req.query.meeting_id, date: req.query.date }
                }
                else {
                    if (req.query.meeting_id) {
                        filter = { meeting: req.query.meeting_id }
                    }
                    else if (req.query.date) {
                        filter = { date: req.query.date }
                    }
                }
                const result = await DI.em.find(MeetingDate, filter)
                res.send(result)
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const result = await DI.em.findOne(MeetingDate, { id: req.params.id })
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }
}