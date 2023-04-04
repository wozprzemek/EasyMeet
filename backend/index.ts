import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core";
import bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import http from 'http';
import { errorHandler } from "./src/middlewares/errorHandler";
import options from "./src/mikro-orm.config";
import AvailabilityRoutes from "./src/routes/Availability.routes";
import MeetingRoutes from "./src/routes/Meeting.routes";
import MeetingDateRoutes from "./src/routes/MeetingDate.routes";
import UserRoutes from "./src/routes/User.routes";

const app = express()

const PORT = 8000
const HOST = '0.0.0.0';
const BASE_URL = '/api'

app.use(cors())


export const DI = {} as {
    server: http.Server
    orm: MikroORM,
    em: EntityManager,
}

(async () => {
    DI.orm = await MikroORM.init(options);
    DI.em = DI.orm.em as EntityManager;
    app.use(bodyParser.json())
    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
    app.use(`${BASE_URL}/availabilities`, AvailabilityRoutes)
    app.use(`${BASE_URL}/meetings`, MeetingRoutes)
    app.use(`${BASE_URL}/meetingdates`, MeetingDateRoutes)
    app.use(`${BASE_URL}/users`, UserRoutes)

    app.use('*', (req, res) => {
        res.sendStatus(404)
    })

    app.use(errorHandler);

    DI.server = app.listen(PORT, HOST, () => {
        console.log(`listening on ${PORT}`);
    })
})();
