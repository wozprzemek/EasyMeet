import { Router } from "express";
import { AvailabilityController } from "../controllers/Availability.controller";

const AvailabilityRoutes = Router()

AvailabilityRoutes.get('/', AvailabilityController.getMany)
AvailabilityRoutes.get('/:id', AvailabilityController.getOne)

export default AvailabilityRoutes