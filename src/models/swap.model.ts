import mongoose, { Schema, Document } from "mongoose";
import { ListingDocument } from "./listing.model";

export interface SwapDocument extends Document {
    listingRequested: ListingDocument["_id"];
    listingOffered: ListingDocument["_id"];
}

const SwapSchema: Schema = new Schema({
    listingRequested: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    listingOffered: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
});

const Swap = mongoose.model<SwapDocument>("Swap", SwapSchema);

export default Swap;
