import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { get } from "lodash";
import {
    createSession,
    createAccessToken,
    updateSession,
    findSessions,
} from "../services/session.service";
import { sign } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // validate user email and password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = await createAccessToken({ user, session });

    // create refresh token
    const refreshToken = await sign(session, {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    // send back refresh token and access token
    return res.send({
        accessToken,
        refreshToken,
        expiresIn: config.get("accessTokenTtl"),
    });
};

export const invalidateUserSessionHandler = async (
    req: Request,
    res: Response
) => {
    const sessionId = get(req, "user.session");

    await updateSession({ _id: sessionId }, { valid: false });

    return res.sendStatus(200);
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
};
