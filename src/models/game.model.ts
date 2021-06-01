import mongoose, { Schema, Document } from "mongoose";

export interface GameDocument extends Document {
    title: string;
    gameConsole: string;
    genres: string[];
    description: string;
    coverImage: string;
    rating: number;
    releaseDate: Date;
}

const GameSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        gameConsole: {
            type: String,
            required: true,
        },
        genres: [
            {
                type: String,
                required: true,
            },
        ],
        description: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        rating: {
            type: Number,
        },
        releaseDate: {
            type: Date,
        },
    },
    { timestamps: true }
);

GameSchema.index({ gameConsole: 1, title: 1 }, { unique: true });

const Game = mongoose.model<GameDocument>("Game", GameSchema);

export default Game;
