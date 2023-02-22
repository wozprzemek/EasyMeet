import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const UserRoutes = Router()

UserRoutes.get('/', UserController.getByMeetingId)
UserRoutes.post('/', UserController.add)
UserRoutes.patch('/', UserController.update)
UserRoutes.delete('/', UserController.delete)

export default UserRoutes