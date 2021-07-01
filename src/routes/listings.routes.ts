import { Router } from "express";
import {
    createListingHandler,
    getGameListingsHandler,
    getUsersListingsHandler,
    getListingHandler,
} from "../controllers/listings.controller";
import { createListingSchema } from "../schemas/listing.schema";
import { validateRequest, requiresUser, extractFile } from "../middleware";

const listingsRouter = Router();

// Create a listing
listingsRouter.post(
    "/api/games/:gameId/listings",
    requiresUser,
    extractFile,
    validateRequest(createListingSchema),
    createListingHandler
);

// Get a game's listings
listingsRouter.get("/api/games/:gameId/listings", getGameListingsHandler);

// Get a user's listings
listingsRouter.get("/api/users/:userId/listings", getUsersListingsHandler);

// Get a listing
listingsRouter.get("/api/listings/:listingId", getListingHandler);

export default listingsRouter;
