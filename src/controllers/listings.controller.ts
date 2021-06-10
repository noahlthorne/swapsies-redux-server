import { Request, Response } from "express";
import { get } from "lodash";
import { createListing, findGameListings } from "../services/listing.service";

export const createListingHandler = async (req: Request, res: Response) => {
    const userId = get(req, "user._id");
    const gameId = get(req, "params.gameId");
    const { condition } = req.body;
    const listing = await createListing({
        user: userId,
        game: gameId,
        condition,
    });
    res.send(listing);
};

export const getGameListingsHandler = async (req: Request, res: Response) => {
    const gameId = get(req, "params.gameId");
    const listings = await findGameListings({ game: gameId });
    return res.send({ listings: listings });
};
