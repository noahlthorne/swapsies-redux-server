import { Request } from "express";
import { IUser } from "../models/user.model";

export interface IGetUserAuthInfoRequest extends Request {
    user: IUser;
}
