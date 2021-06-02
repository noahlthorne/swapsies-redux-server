import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Game, { GameDocument } from "../models/game.model";

export const createGame = async (input: DocumentDefinition<GameDocument>) => {
    try {
        return await Game.create(input);
    } catch (error) {
        throw new Error(error);
    }
};

export const getGames = async () => {
    return Game.find({}).sort({ title: "desc" });
};

export const findGame = async (
    query: FilterQuery<GameDocument>,
    options: QueryOptions = { lean: true }
) => {
    return Game.findOne(query, {}, options);
};
