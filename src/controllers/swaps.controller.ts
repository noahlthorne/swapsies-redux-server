import { Request, Response } from "express";
import { createSwap, findListingsSwaps } from "../services/swaps.service";
import { get } from "lodash";
import log from "../logger";

export const getUserSwapsHandler = async (req: Request, res: Response) => {
    console.log("swaps controller");
};

export const getListingSwapsHandler = async (req: Request, res: Response) => {
    const listingId = get(req, "params.listingId");
    try {
        const swaps = await findListingsSwaps({ listingRequested: listingId });
        if (!swaps)
            return res.status(404).send({ message: "Listing not found!" });
        return res.send({ swaps: swaps });
    } catch (error) {
        return res.status(404).send({ message: "Error fetching swaps!" });
    }
};

export const createSwapHandler = async (req: Request, res: Response) => {
    try {
        const swap = await createSwap(req.body);
        return res.status(201).send({ swap: swap });
    } catch (error) {
        log.info(error);
        return res.status(404).send({ message: "Error saving swap" });
    }
};

export const getUserSwapRequestsHandler = async (
    req: Request,
    res: Response
) => {
    console.log("get user swaps");
};
