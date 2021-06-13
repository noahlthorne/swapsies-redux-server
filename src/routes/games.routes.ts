import { Router } from "express";
import {
    createGameHandler,
    getGamesHandler,
    getGameHandler,
} from "../controllers/games.controller";
import { createGameSchema } from "../schemas/game.schema";
import { validateRequest } from "../middleware";

const gamesRouter = Router();

// Create a game
gamesRouter.post("", validateRequest(createGameSchema), createGameHandler);

// Get games
gamesRouter.get("", getGamesHandler);

// Get a game
gamesRouter.get("/:gameId", getGameHandler);

export default gamesRouter;
