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

export const findGameListings = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    return await Listing.find(query, {}, options);
};

export const findUsersListings = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    let listings = await Listing.find(query, {}, options);
    const promises = listings.map(async (listing) => {
        listing.game = await findGame({ _id: listing.game });
        return listing;
    });
    const trasformedListings = await Promise.all(promises);
    return trasformedListings;
};

export const findListing = async (
    query: FilterQuery<ListingDocument>,
    options: QueryOptions = { lean: true }
) => {
    let listing = await Listing.findOne(query, {}, options);
    if (listing) {
        listing.user = await findUser({ _id: listing.user });
        listing.game = await findGame({ _id: listing.game });
    }
    return listing;
};
