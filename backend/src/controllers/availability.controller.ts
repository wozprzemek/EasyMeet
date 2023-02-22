import { wrap } from "@mikro-orm/core";
import { NextFunction, Request, Response } from "express";
import { DI } from "../..";
import { Availability } from "../entities/Availability.entity";
import { Meeting } from "../entities/Meeting.entity";

export const AvailabilityController = {
    getByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await DI.em.find(Availability, {id: req.params.id} )
            console.log(result);
            res.send(result)
        } catch (error) {
            console.error(error);
            res.status(500).send(500)
        }
    },
    add: async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const meeting = DI.em.create(Availability, req.body as Availability)
        //     await DI.em.persist(meeting).flush()
        //     res.send('created a meeting')
        // } catch (error) {
        //     console.error(error);
        //     res.sendStatus(500)
        // }
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