// import {
//     createGameHandler,
//     getGamesHandler,
//     getGameHandler,
// } from "../../../src/controllers/games.controller";
// const GameModel = require("../../model/game.model");
// const httpMocks = require("node-mocks-http");
// const newGame = require("../mock-data/new-game.json");

// GameModel.create = jest.fn();
// let req, res, next;
// beforeEach(() => {
//     req = httpMocks.createRequest();
//     res = httpMocks.createResponse();
//     next = null;
//     req.body = newGame;
// });

// describe("GamesController.createGame", () => {
//     it("should have a createGame function", () => {
//         expect(typeof GamesController.createGame).toBe("function");
//     });
//     it("should call GameModel.create", () => {
//         GamesController.createGame(req, res, next);
//         expect(GameModel.create).toBeCalledWith(newGame);
//     });
//     it("should return 201 response code", () => {
//         GamesController.createGame(req, res, next);
//         expect(res.statusCode).toBe(201);
//         expect(res._isEndCalled()).toBeTruthy();
//     });
//     it("should return json body in response", () => {
//         GameModel.create.mockReturnValue(newGame);
//         GamesController.createGame(req, res, next);
//         expect(res._getJSONData()).toStrictEqual(newGame);
//     });
// });
