import { Request, Response } from "express";
import { get } from "lodash";

export const getUserSwapsHandler = async (req: Request, res: Response) => {
    console.log("swaps controller");
};

export const getListingSwapsHandler = async (req: Request, res: Response) => {
    console.log("get listing swaps");
};

export const createSwapHandler = async (req: Request, res: Response) => {
    console.log("create swap");
};
