import { Router } from "express";
import {
    getUserSwapsHandler,
    getListingSwapsHandler,
    createSwapHandler,
    getUserSwapRequestsHandler,
} from "../controllers/swaps.controller";
import { validateRequest, requiresUser, extractFile } from "../middleware";

const swapsRouter = Router();

// Create a swap
swapsRouter.post("/api/swaps", createSwapHandler);

// Get a listing's swaps
swapsRouter.get("/api/listings/:listingId/swaps", getListingSwapsHandler);

// Get a user's swaps
swapsRouter.get("/api/users/:userId/swaps", getUserSwapsHandler);

//get a user's swap requests
swapsRouter.get(
    "/api/users/:userId/swaps/requested",
    getUserSwapRequestsHandler
);

export default swapsRouter;
