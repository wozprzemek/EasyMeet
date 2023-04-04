import { Request, Response } from "express";
import { Meeting } from "../entities/Meeting.entity";
import { IdParams } from "../interfaces/IdParams";
import { MeetingCreateRequestBody, MeetingResponse } from "../schemas/Meeting.schema";
import { MeetingService } from "../services/Meeting.service";

export const MeetingController = {
    getAll: async (req: Request<{}, Meeting[], {}, {}>, res: Response<Meeting[]>) => {
        try {
            const data = await MeetingService.getMany()
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getOne: async (req: Request<IdParams, Meeting, {}, {}>, res: Response<Meeting | null>) => {
        try {
            const id = req.params.id
            const data = await MeetingService.getOne({ id: id })
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    add: async (req: Request<{}, {}, MeetingCreateRequestBody, {}>, res: Response<MeetingResponse | string>) => {
        try {
            const { name, dates, from, to, active } = req.body
            if (dates.length === 0) {
                res.status(500).send('Meeting must have dates.')
                return
            }
            const data = await MeetingService.add({ name, dates, from, to, active })
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    },
}