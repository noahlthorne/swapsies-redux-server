import mongoose, { Schema, Document } from "mongoose";
import Listing, { ListingDocument, ListingSchema } from "./listing.model";

export interface SwapDocument extends Document {
    listingRequested: ListingDocument;
    listingOffered: ListingDocument;
}

const SwapSchema: Schema = new Schema({
    listingRequested: {
        type: ListingSchema,
        ref: "Listing",
        required: true,
    },
    listingOffered: {
        type: ListingSchema,
        ref: "Listing",
        required: true,
    },
});

const Swap = mongoose.model<any>("Swap", SwapSchema);

export default Swap;
