import express from "express";
import cors from "cors";
require("dotenv").config();
import config from "config";
import log from "./logger";
import connectDB from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
import "./jobs/cronJobs";

const port = config.get("port") as number;
const host = config.get("host") as string | "0.0.0.0";
const allowedOrigins = [
    "http://localhost:4200",
    "https://swapsies-3acb0.web.app",
];
const app = express();
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                let msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);
app.use(deserializeUser);

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);
    log.info(`Host is ${host}`);
    // Connect to database
    connectDB();
});
