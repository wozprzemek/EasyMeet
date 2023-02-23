import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const UserRoutes = Router()

UserRoutes.get('/', UserController.getMany)
UserRoutes.get('/:id', UserController.getOne)
UserRoutes.post('/', UserController.add)
UserRoutes.put('/:id', UserController.update)
UserRoutes.delete('/:id', UserController.delete)

export default UserRoutes