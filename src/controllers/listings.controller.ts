import { Request, Response } from "express";
import { get } from "lodash";
import {
    createListing,
    findGameListings,
    findListing,
} from "../services/listing.service";

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
    try {
        const listings = await findGameListings({ game: gameId });
        if (!listings)
            return res.status(404).send({ message: "Game not found!" });
        return res.send({ listings: listings });
    } catch (error) {
        return res.status(404).send({ message: "Error fetching listings!" });
    }
};

export const getListingHandler = async (req: Request, res: Response) => {
    const listingId = get(req, "params.listingId");
    try {
        const listing = await findListing({ _id: listingId });
        if (!listing)
            return res.status(404).send({ message: "Listing not found!" });
        return res.send(listing);
    } catch (error) {
        return res.status(404).send({ message: "Listing not found!" });
    }
};
