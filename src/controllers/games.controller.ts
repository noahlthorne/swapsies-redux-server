import { Request, Response } from "express";
import { createGame, findGame, getGames } from "../services/game.service";
import log from "../logger";
import { get } from "lodash";

export const createGameHandler = async (req: Request, res: Response) => {
    try {
        const game = await createGame(req.body);
        return res.send(game);
    } catch (error) {
        log.error(error);
        return res.status(409).send(error.message);
    }
};

export const getGamesHandler = async (req: Request, res: Response) => {
    const games = await getGames();
    return res.send({ games: games });
};

export const getGameHandler = async (req: Request, res: Response) => {
    const gameId = get(req, "params.gameId");
    try {
        const game = await findGame({ _id: gameId });
        return res.send(game);
    } catch (error) {
        return res.sendStatus(404);
    }
};
