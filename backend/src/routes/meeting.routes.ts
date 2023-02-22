import { Router } from "express";
import { MeetingController } from "../controllers/Meeting.controller";

const MeetingRoutes = Router()

MeetingRoutes.get('/', MeetingController.getAll)
MeetingRoutes.get('/:id', MeetingController.getOne)
MeetingRoutes.post('/', MeetingController.add)
MeetingRoutes.put('/:id', MeetingController.update)
MeetingRoutes.delete('/:id', MeetingController.delete)

export default MeetingRoutes