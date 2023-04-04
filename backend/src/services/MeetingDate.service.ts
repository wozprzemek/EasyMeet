import { Request, Response } from "express";
import { MeetingDateQuery } from "../schemas/MeetingDate.schema";
import { MeetingDate } from "../entities/MeetingDate.entity";
import { DI } from "../..";
import { IdParams } from "../interfaces/IdParams";

export const MeetingDateService = {
    getMany: async (query: MeetingDateQuery) => {
        const data = await DI.em.find(MeetingDate, query)
        return data
    },
    getOne: async (id: IdParams) => {
        const data = await DI.em.findOne(MeetingDate, id)
        return data
    },
}