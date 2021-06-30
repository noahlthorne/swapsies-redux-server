import { Router } from "express";
import usersRouter from "./users.routes";
import gamesRouter from "./games.routes";
import listingsRouter from "./listings.routes";
import swapsRouter from "./swaps.routes";

const routes = Router();

routes.use(usersRouter);
routes.use("/api/games", gamesRouter);
routes.use(listingsRouter);
routes.use(swapsRouter);

export default routes;
