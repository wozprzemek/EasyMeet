import { NextFunction, Request, Response } from "express";

export const UserController = {
    getByMeetingId: (req: Request, res: Response, next: NextFunction) => {
        res.send('users get')
    },
    add: (req: Request, res: Response, next: NextFunction) => {
        res.send('users post')
    },
    update: (req: Request, res: Response, next: NextFunction) => {
        res.send('users patch')
    },
    delete: (req: Request, res: Response, next: NextFunction) => {
        res.send('users delete')
    },
}