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
                let filter: {date?: any, meeting?: any} = {}
                if (req.query.meeting_id && req.query.date) {
                    filter = {meeting: req.query.meeting_id, date: req.query.date}
                }
                else {
                    if (req.query.meeting_id) {
                        filter = {meeting: req.query.meeting_id}
                    }
                    else if(req.query.date) {
                        filter = {date: req.query.date}
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
            const result = await DI.em.findOne(MeetingDate, {id: req.params.id})
            res.send(result)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }
    // },
    // add: async (req: Request, res: Response) => {
    //     try {
    //         const data = req.body as TMeetingDate
    //         const MeetingDate = DI.em.create(MeetingDate, data)

    //         await DI.em.persistAndFlush(MeetingDate)
    //         res.send(MeetingDate.id)
    //     } catch (error) {
    //         console.error(error)
    //         res.sendStatus(500)
    //     }
    // },
    // update: async (req: Request, res: Response) => {
    //     try {
    //         const data = req.body as TMeetingDate
    //         const MeetingDate = await DI.em.findOneOrFail(MeetingDate, {id: req.params.id});

    //         wrap(MeetingDate).assign(data);
    //         await DI.em.flush();
    //         res.send(MeetingDate)
    //     } catch (error) {
    //         console.error(error);
    //         res.sendStatus(500)
    //     }
    // },
    // delete: async (req: Request, res: Response) => {
    //     try {
    //         const MeetingDate = DI.em.getReference(MeetingDate, req.params.id);
    //         console.log(MeetingDate);
    //         await DI.em.remove(MeetingDate).flush();  
    //         res.send('deleted a MeetingDate')
    //     } catch (error) {
    //         console.error(error);
    //         res.sendStatus(500)
    //     }
    // },
}