import { Router } from "express";
import { MeetingDateController } from "../controllers/MeetingDate.controller";

const MeetingDateRoutes = Router()

MeetingDateRoutes.get('/', MeetingDateController.getAll)
MeetingDateRoutes.get('/:id', MeetingDateController.getOne)
// MeetingDateRoutes.post('/', MeetingDateController.add)
// MeetingDateRoutes.put('/:id', MeetingDateController.update)
// MeetingDateRoutes.delete('/:id', MeetingDateController.delete)

export default MeetingDateRoutes