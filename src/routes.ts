import { Express, Request, Response, NextFunction } from "express";
import { createUserHandler } from "./controllers/users.controller";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler,
} from "./controllers/sessions.controller";
import {
    createGameHandler,
    getGameHandler,
} from "./controllers/games.controller";
import {
    createUserSchema,
    createUserSessionSchema,
} from "./schemas/user.schema";
import { createGameSchema } from "./schemas/game.schema";
import { validateRequest, requiresUser } from "./middleware";

export default function (app: Express) {
    // USERS
    // Reister user
    app.post(
        "/api/users",
        validateRequest(createUserSchema),
        createUserHandler
    );

    // Login
    app.post(
        "/api/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    );

    // Get the user's session
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    // Logout
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

    // GAMES
    // Create a game
    app.post(
        "/api/games",
        validateRequest(createGameSchema),
        createGameHandler
    );

    // Get a game
    app.get("/api/games/:gameId", getGameHandler);
}
