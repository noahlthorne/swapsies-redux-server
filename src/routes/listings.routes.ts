import { Router } from "express";
import {
    createListingHandler,
    getGameListingsHandler,
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

// Get a games listings
listingsRouter.get("/api/games/:gameId/listings", getGameListingsHandler);

listingsRouter.get("/api/listings/:listingId", getListingHandler);

export default listingsRouter;
