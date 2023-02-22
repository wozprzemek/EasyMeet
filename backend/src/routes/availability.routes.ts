import { Router } from "express";
import { AvailabilityController } from "../controllers/Availability.controller";

const AvailabilityRoutes = Router()

AvailabilityRoutes.get('/', AvailabilityController.getByUserId)
AvailabilityRoutes.post('/', AvailabilityController.add)
AvailabilityRoutes.put('/:id', AvailabilityController.update)
AvailabilityRoutes.delete('/:id', AvailabilityController.delete)

export default AvailabilityRoutes