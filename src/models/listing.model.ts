import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";
import { GameDocument } from "./game.model";

export interface ListingDocument extends Document {
    user: UserDocument["_id"];
    game: GameDocument["_id"];
    condition: String;
    status?: String;
    imagePath: String;
}

const ListingSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game",
            required: true,
        },
        condition: { type: String },
        imagePath: { type: String, required: true },
        status: { type: String, default: "available" },
    },
    { timestamps: true }
);

const Listing = mongoose.model<ListingDocument>("Listing", ListingSchema);

export default Listing;
