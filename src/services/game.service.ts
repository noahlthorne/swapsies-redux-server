import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose";
import Game, { GameDocument } from "../models/game.model";

export const createGame = async (input: DocumentDefinition<GameDocument>) => {
    try {
        return await Game.create(input);
    } catch (error) {
        throw new Error(error);
    }
};

export const getGames = async ({
    gameConsole,
    pageSize,
    currentPage,
    sortBy,
    orderBy,
    search,
}: {
    gameConsole: string;
    pageSize: number;
    currentPage: number;
    sortBy: string;
    orderBy: string;
    search: string;
}) => {
    let games: any = [];
    if (search != "") {
        games = await Game.find({
            $text: { $search: search },
            gameConsole: gameConsole,
        })
            .limit(pageSize)
            .sort({ [sortBy]: [orderBy] })
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
    } else {
        games = await Game.find({ gameConsole: gameConsole })
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
            .sort({ [sortBy]: [orderBy] })
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
    }
    return games;
};

export const findGame = (
    query: FilterQuery<GameDocument>,
    options: QueryOptions = { lean: true }
) => {
    return Game.findOne(query, {}, options);
};
