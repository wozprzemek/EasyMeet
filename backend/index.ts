import { RequestContext } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/core";
import express, { Request, Response } from "express"
import options from "./src/config/mikro-orm.config";

const port = 8000

const app = express()
export const init = (async () => {
    const orm = await MikroORM.init(options);
    app.use((req, res, next) => RequestContext.create(orm.em, next));
})();
app.get("/", async (req: Request, res: Response) => {
    res.send('Sorry :(')
})

app.get("/test/", (req: Request, res: Response) => {
    res.send('HELLO TEST')
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})