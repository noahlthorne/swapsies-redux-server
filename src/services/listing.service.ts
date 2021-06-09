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
    const listings = await Listing.find(query, {}, options);
    const promises = listings.map(async (listing) => {
        listing.user = await findUser({ _id: listing.user });
        listing.game = await findGame({ _id: listing.game });
        return listing;
    });
    const transformedListings = await Promise.all(promises);
    return transformedListings;
};
