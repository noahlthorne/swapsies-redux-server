import express, { Application, Request, Response, NextFunction } from "express";
require("dotenv").config();
import config from "config";
import log from "./logger";
import connectDB from "./db/connect";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app: Application = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
});

app.listen(port, host, () =>
    log.info(`Server listening at http://${host}:${port}`)
);
