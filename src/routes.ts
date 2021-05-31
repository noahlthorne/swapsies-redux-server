import { Express, Request, Response, NextFunction } from "express";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSchema } from "./schemas/user.schema";
import validateRequest from "./middleware/validateRequest";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    // Reister user
    app.post(
        "/api/users",
        validateRequest(createUserSchema),
        createUserHandler
    );
    // Post /api/user

    // Login
    // POST /api/sessions

    // Get the user's session
    // GET /api/sessions

    // Logout
    // DELETE /api/sessions
}
