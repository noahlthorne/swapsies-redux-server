import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { UserDocument } from "../models/user.model";
import { findUser } from "./user.service";
import Session, { SessionDocument } from "../models/session.model";
import { sign, decode } from "../utils/jwt.utils";
import { IsBooleanOptions } from "express-validator/src/options";
import { SessionState } from "http2";

export const createSession = async (userId: string, userAgent: string) => {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON();
};

export const createAccessToken = async ({
    user,
    session,
}: {
    user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "password">>;
    session:
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "password">>;
}) => {
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
    return accessToken;
};

export const reissueAccessToken = async ({
    refreshToken,
}: {
    refreshToken: string;
}) => {
    // decode the refresh token
    const { decoded } = decode(refreshToken);

    if (!decoded || !get(decoded, "_id")) return false;

    // get the session
    const session = await Session.findById(get(decoded, "_id"));

    //make sure the session is still valid
    if (!session || !session?.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = createAccessToken({ user, session });
};

export const updateSession = async (
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) => {
    return Session.updateOne(query, update);
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
    return Session.find(query).lean();
};
