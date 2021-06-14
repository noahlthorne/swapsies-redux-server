import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";
import { GameDocument } from "./game.model";

export interface ListingDocument extends Document {
    user: UserDocument["_id"];
    game: GameDocument["_id"];
    condition: String;
    status?: String;
    image: String;
}

const ListingSchema: Schema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        game: { type: mongoose.Schema.Types.ObjectId, ref: "Game" },
        condition: { type: String },
        image: { type: String },
        status: { type: String, default: "available" },
    },
    { timestamps: true }
);

const Listing = mongoose.model<ListingDocument>("Listing", ListingSchema);

export default Listing;
