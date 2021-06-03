import { Express } from "express";
import { createUserHandler } from "./controllers/users.controller";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler,
} from "./controllers/sessions.controller";
import {
    createListingHandler,
    getGameListingsHandler,
} from "./controllers/listings.controller";
import {
    createGameHandler,
    getGamesHandler,
    getGameHandler,
} from "./controllers/games.controller";

import {
    createUserSchema,
    createUserSessionSchema,
} from "./schemas/user.schema";
import { createGameSchema } from "./schemas/game.schema";
import { createListingSchema } from "./schemas/listing.schema";
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

    // Get games
    app.get("/api/games/", getGamesHandler);

    // Get a game
    app.get("/api/games/:gameId", getGameHandler);

    // LISTINGS
    // Create a listing
    app.post(
        "/api/games/:gameId/listings",
        [requiresUser, validateRequest(createListingSchema)],
        createListingHandler
    );

    // Get a games listings
    app.get("/api/games/:gameId/listings", getGameListingsHandler);
}
