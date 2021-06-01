import { Request, Response } from "express";
import { createGame, findGame } from "../services/game.service";
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

export const getGameHandler = async (req: Request, res: Response) => {
    const gameId = get(req, "game._id");
    const game = await findGame({ game: gameId });
};
