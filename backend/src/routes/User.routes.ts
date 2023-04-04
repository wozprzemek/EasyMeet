import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { UserLoginOrCreateRequestBody, UserQuery } from "../schemas/User.schema";
import { IdParams } from "../interfaces/IdParams";

const UserRoutes = Router()

UserRoutes.get('/', validateRequest({ query: UserQuery }), UserController.getMany)
UserRoutes.get('/:id', validateRequest({ params: IdParams }), UserController.getOne)
UserRoutes.post('/', validateRequest({ body: UserLoginOrCreateRequestBody }), UserController.loginOrCreate)

export default UserRoutes