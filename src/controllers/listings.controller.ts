import { Request, Response } from "express";
import { get } from "lodash";
import { createListing, findGameListings } from "../services/listing.service";

export const createListingHandler = async (req: Request, res: Response) => {
    const url = `${req.protocol}://${req.get("host")};`;
    const userId = get(req, "user._id");
    const gameId = get(req, "params.gameId");
    const { condition } = req.body;
    const createdListing = await createListing({
        user: userId,
        game: gameId,
        imagePath: `${url}/images/${req.file.filename}`,
        condition,
    });

    res.send({ listing: createdListing });
};

export const getGameListingsHandler = async (req: Request, res: Response) => {
    const gameId = get(req, "params.gameId");
    const listings = await findGameListings({ game: gameId });
    return res.send({ listings: listings });
};
