import { Router } from "express";
import { getUserSwapsHandler } from "../controllers/swaps.controller";
import { validateRequest, requiresUser, extractFile } from "../middleware";

const swapsRouter = Router();

// Create a swap
swapsRouter.post("/api/games/:gameId/swaps");

// Get a user's swaps
swapsRouter.get("/api/swaps/:userId/swaps", getUserSwapsHandler);

export default swapsRouter;
