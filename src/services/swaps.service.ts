import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Listing, { ListingDocument } from "../models/listing.model";
import { findGame } from "./game.service";
import { findUser } from "./user.service";

export const getListings = async (
    input: DocumentDefinition<ListingDocument>
) => {
    try {
        return await Listing.create(input);
    } catch (error) {
        throw new Error(error);
    }
};
