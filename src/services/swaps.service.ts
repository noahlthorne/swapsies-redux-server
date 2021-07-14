import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Listing, { ListingDocument } from "../models/listing.model";
import Swap, { SwapDocument } from "../models/swap.model";
import { findGame } from "./game.service";
import { findListing } from "./listing.service";
import { findUser } from "./user.service";

export const createSwap = async (input: DocumentDefinition<SwapDocument>) => {
    try {
        let newSwap = await Swap.create(input);
        await newSwap
            .populate({
                path: "listingRequested",
                model: "Listing",
                populate: [
                    { path: "user", model: "User" },
                    { path: "game", model: "Game" },
                ],
            })
            .populate({
                path: "listingOffered",
                model: "Listing",
                populate: [
                    { path: "user", model: "User" },
                    { path: "game", model: "Game" },
                ],
            })
            .execPopulate();
        return newSwap;
    } catch (error) {
        throw new Error(error);
    }
};

export const findListingsSwaps = async (
    query: FilterQuery<SwapDocument>,
    options: QueryOptions = { lean: true }
) => {
    return await Swap.find(query, {}, options)
        .populate({
            path: "listingRequested",
            model: "Listing",
            populate: [
                { path: "user", model: "User" },
                { path: "game", model: "Game" },
            ],
        })
        .populate({
            path: "listingOffered",
            model: "Listing",
            populate: [
                { path: "user", model: "User" },
                { path: "game", model: "Game" },
            ],
        });
};
