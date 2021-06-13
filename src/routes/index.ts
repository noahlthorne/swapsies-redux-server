import { Router } from "express";
import usersRouter from "./users.routes";
import gamesRouter from "./games.routes";
import listingsRouter from "./listings.routes";

const routes = Router();

routes.use(usersRouter);
routes.use(listingsRouter);
routes.use("/api/games", gamesRouter);

export default routes;
