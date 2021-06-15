import { listenerCount } from "events";
import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Game, { GameDocument } from "../models/game.model";

export const createGame = async (input: DocumentDefinition<GameDocument>) => {
    try {
        return await Game.create(input);
    } catch (error) {
        throw new Error(error);
    }
};

export const getGames = (
    gameConsole: string,
    pageSize: number,
    currentPage: number
) => {
    let games: any = [];
    return Game.find({ gameConsole: gameConsole })
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .sort({ title: "asc" })
        .then((documents) => {
            games = documents;
            return Game.countDocuments({ gameConsole: gameConsole });
        })
        .then((count) => {
            return {
                games: games,
                maxGames: count,
            };
        });
};

export const findGame = async (
    query: FilterQuery<GameDocument>,
    options: QueryOptions = { lean: true }
) => {
    return Game.findOne(query, {}, options);
};
