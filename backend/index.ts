import express, { Request, Response } from "express"

const port = 8000

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send('HELLO')
})

app.get("/test/", (req: Request, res: Response) => {
    res.send('HELLO TEST')
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})