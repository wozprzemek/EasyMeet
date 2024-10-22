import { Router } from "express";
import { AvailabilityController } from "../controllers/Availability.controller";
import { IdParams } from "../interfaces/IdParams";
import { validateRequest } from "../middlewares/validateRequest";
import { AvailabilityQuery, AvailabilityUpdateRequestBody } from "../schemas/Availability.schema";

const AvailabilityRoutes = Router()

AvailabilityRoutes.get('/', validateRequest({ query: AvailabilityQuery }), AvailabilityController.getMany)
AvailabilityRoutes.get('/:id', validateRequest({ params: IdParams }), AvailabilityController.getOne)
AvailabilityRoutes.put('/', validateRequest({ body: AvailabilityUpdateRequestBody }), AvailabilityController.updateUserAvailabilities)

export default AvailabilityRoutes