import { Router } from "express";
import { createUserHandler } from "../controllers/users.controller";
import {
    createUserSchema,
    createUserSessionSchema,
} from "../schemas/user.schema";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler,
} from "../controllers/sessions.controller";
import { validateRequest, requiresUser } from "../middleware";

const usersRouter = Router();

// Reister user
usersRouter.post(
    "/api/users",
    validateRequest(createUserSchema),
    createUserHandler
);

// Login
usersRouter.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
);

// Get the user's session
usersRouter.get("/api/sessions", requiresUser, getUserSessionsHandler);

// Logout
usersRouter.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

export default usersRouter;
