import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/core";
import bodyParser from 'body-parser';
import express from "express";
import http from 'http';
import options from "./src/mikro-orm.config";
import AvailabilityRoutes from "./src/routes/Availability.routes";
import MeetingRoutes from "./src/routes/Meeting.routes";
import MeetingDateRoutes from "./src/routes/MeetingDate.routes";

const app = express()
const port = 8000

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
    app.use('/availabilities', AvailabilityRoutes)
    app.use('/meetings', MeetingRoutes)
    app.use('/meetingdates', MeetingDateRoutes)

    app.use('*', (req, res) => {
        res.send('SORRY')
    })
    
    DI.server = app.listen(port, () => {
        console.log(`listening on ${port}`);
    })
})();
