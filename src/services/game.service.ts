import { DocumentDefinition, FilterQuery } from "mongoose";
import Game, { GameDocument } from "../models/game.model";

export const createGame = async (input: DocumentDefinition<GameDocument>) => {
    try {
        console.log(input);
        return await Game.create(input);
    } catch (error) {
        throw new Error(error);
    }
};

export const findGame = async (query: FilterQuery<GameDocument>) => {
    return Game.find(query).lean();
};
