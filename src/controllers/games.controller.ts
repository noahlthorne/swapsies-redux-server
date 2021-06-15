import { Request, Response } from "express";
import { createGame, findGame, getGames } from "../services/game.service";
import log from "../logger";
import { get } from "lodash";
import Game from "../models/game.model";

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
    const pageSize: number = +req.query.pagesize!;
    const currentPage: number = +req.query.currentpage!;
    if (pageSize && currentPage) {
        const games = await getGames(pageSize, currentPage);
        return res.send({ games: games });
    }
    return res.sendStatus(404);
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
