import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Listing, { ListingDocument } from "../models/listing.model";

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
    console.log(query);
    return Listing.find(query);
};
