import { Express, Request, Response, NextFunction } from "express";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send("hello");
    });
}
