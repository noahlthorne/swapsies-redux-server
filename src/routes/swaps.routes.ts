import { Router } from "express";
import {
    getUserSwapsHandler,
    getListingSwapsHandler,
    createSwapHandler,
} from "../controllers/swaps.controller";
import { validateRequest, requiresUser, extractFile } from "../middleware";

const swapsRouter = Router();

// Create a swap
swapsRouter.post("/api/listings/:listingId/swaps", createSwapHandler);

// Get a listing's swaps
swapsRouter.get("/api/listings/:listingId/swaps", getListingSwapsHandler);

// Get a user's swaps
swapsRouter.get("/api/swaps/:userId/swaps", getUserSwapsHandler);

export default swapsRouter;
