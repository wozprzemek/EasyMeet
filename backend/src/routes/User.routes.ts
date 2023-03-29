import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const UserRoutes = Router()

UserRoutes.get('/', UserController.getMany)
UserRoutes.get('/:id', UserController.getOne)
UserRoutes.post('/', UserController.loginOrCreate)
UserRoutes.patch('/:id', UserController.update)

export default UserRoutes