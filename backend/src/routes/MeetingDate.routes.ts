import { Router } from "express";
import { MeetingDateController } from "../controllers/MeetingDate.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { IdParams } from "../interfaces/IdParams";
import { MeetingDateQuery } from "../schemas/MeetingDate.schema";

const MeetingDateRoutes = Router()

MeetingDateRoutes.get('/', validateRequest({ query: MeetingDateQuery }), MeetingDateController.getMany)
MeetingDateRoutes.get('/:id', validateRequest({ params: IdParams }), MeetingDateController.getOne)
// MeetingDateRoutes.post('/', MeetingDateController.add)

export default MeetingDateRoutes