import { Router } from "express";
import { MeetingController } from "../controllers/Meeting.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { IdParams } from "../interfaces/IdParams";
import { MeetingCreateRequestBody } from "../schemas/Meeting.schema";

const MeetingRoutes = Router()

MeetingRoutes.get('/', MeetingController.getAll)
MeetingRoutes.get('/:id', validateRequest({ params: IdParams }), MeetingController.getOne)
MeetingRoutes.post('/', validateRequest({ body: MeetingCreateRequestBody }), MeetingController.add)

export default MeetingRoutes