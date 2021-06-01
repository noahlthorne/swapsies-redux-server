import express from "express";
require("dotenv").config();
import config from "config";
import log from "./logger";
import connectDB from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);

    // Connect to database
    connectDB();

    routes(app);
});
