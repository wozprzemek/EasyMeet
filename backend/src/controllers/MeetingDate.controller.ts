import { Request, Response } from "express";
import { MeetingDate } from "../entities/MeetingDate.entity";
import { IdParams } from "../interfaces/IdParams";
import { MeetingDateQuery } from "../schemas/MeetingDate.schema";
import { MeetingDateService } from "../services/MeetingDate.service";

export const MeetingDateController = {
    getMany: async (req: Request<{}, MeetingDate[], {}, MeetingDateQuery>, res: Response<MeetingDate[]>) => {
        try {
            const { date, meeting } = req.query
            const query = {
                ...(date && { date: date }),
                ...(meeting && { meeting: meeting })
            }
            const data = await MeetingDateService.getMany(query)
            return data
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getOne: async (req: Request<IdParams, MeetingDate, {}, {}>, res: Response<MeetingDate | null>) => {
        try {
            const id = req.params.id
            const data = await MeetingDateService.getOne({ id: id })
            res.send(data)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}