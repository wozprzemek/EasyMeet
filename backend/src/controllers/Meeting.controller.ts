import { DateTimeType, wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { Meeting } from "../entities/Meeting.entity";
import { MeetingDate } from "../entities/MeetingDate.entity";

export const MeetingController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const query = await DI.em.find(Meeting, {})
            res.send(query)
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    getOne: async (req: Request, res: Response) => {
        try {
            const query = await DI.em.findOne(Meeting, { id: req.params.id }, { populate: ['dates', 'availabilities'] })

            if (query) {
                query.availabilities = query?.availabilities.toArray().reduce((groupedUsers: any, availability) => {
                    const user = availability.user

                    if (groupedUsers[user] === undefined) {
                        groupedUsers[user] = []
                    }
                    groupedUsers[user].push(availability)
                    return groupedUsers
                }, {})

            }
            res.send(query)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
    add: async (req: Request, res: Response) => {
        try {
            const data: { name: string, dates: MeetingDate[], from: DateTimeType, to: DateTimeType, active: boolean } = req.body
            if (data.dates.length === 0) {
                res.status(500).send('Meeting must have dates.')
                return
            }

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
            const data: { name?: string, dates?: MeetingDate[], availabilities?: Availability[], from?: DateTimeType, to?: DateTimeType, active?: boolean } = req.body
            const meeting = await DI.em.findOneOrFail(Meeting, { id: req.params.id }, { populate: ['dates', 'availabilities'] });

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
            await DI.em.remove(meeting).flush();
            res.send('deleted a meeting')
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    },
}