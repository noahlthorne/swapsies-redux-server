import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Listing, { ListingDocument } from "../models/listing.model";
import { findGame } from "./game.service";
import { findUser } from "./user.service";

export const createListing = async (
    input: DocumentDefinition<ListingDocument>
) => {
    try {
        return await Listing.create(input);
    } catch (error) {
        throw new Error(error);
    }
};

export const findListing = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    let listing = await Listing.findOne(query, {}, options)
        .populate("user")
        .populate("game");
    return listing;
};

export const findGameListings = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    return await Listing.find(query, {}, options)
        .populate("user")
        .populate("game");
};

export const findUsersListings = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    return await Listing.find(query, {}, options).populate("game");
};
