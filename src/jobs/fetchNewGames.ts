import axios from "axios";
import config from "config";
import log from "../logger";
import { createGame } from "../services/game.service";

interface gameData {
    id: number;
    aggregated_rating: number;
    cover: {
        id: number;
        url: string;
    };
    summary: string;
    first_release_date: number;
    genres: [{ id: number; name: string }];
    name: string;
    platforms: [{ id: number; name: string }];
}

const fetchNewGames = async (offset: number = 0) => {
    const headers = {
        "Client-ID": config.get("clientId") as string,
        // prettier-ignore
        "Authorization": config.get("igdbAuth") as string,
    };
    const queryString = `fields id,name,platforms.name,summary,first_release_date,genres.name,aggregated_rating,cover.url; limit 50; offset ${offset}; where aggregated_rating > 50 & platforms = (48,49,130,6); sort first_release_date desc;`;

    try {
        const response = await axios.post(
            "https://api.igdb.com/v4/games",
            queryString,
            { headers: headers }
        );
        offset = offset + response.data.length;
        if (response.data.length > 0) {
            log.info(`Fetching data for ${response.data.length} games...`);
            response.data.forEach((game: gameData) => {
                createGamesFromPlatforms(game);
            });
            await setTimeout(() => {
                fetchNewGames(offset);
            }, 1000);
        } else {
            log.info("Completed fetching new games");
            return;
        }
    } catch (error) {
        log.error(error.message);
        return;
    }
};

const createGamesFromPlatforms = (game: gameData) => {
    game.platforms.forEach(async (platform) => {
        const gameObj = buildGame(game, platform.name);
        try {
            await createGame(gameObj);
        } catch (error) {
            log.error(error.message);
        }
    });
};

const buildGame = (game: gameData, platform: string) => {
    const { name, summary, cover, aggregated_rating, first_release_date } =
        game;
    const milliseconds = first_release_date * 1000;
    let releaseDate = new Date();
    if (first_release_date) {
        releaseDate = new Date(milliseconds);
    }
    let genres: any = game.genres;
    if (genres) {
        genres = genres.map((genre: any) => {
            return genre.name;
        });
    }
    let coverImage =
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1s0j.jpg";
    if (cover) {
        coverImage = `https:${cover.url}`.replace("t_thumb", "t_cover_big");
    }
    const gameObj = {
        title: name,
        gameConsole: platform,
        genres: genres || [],
        description: summary,
        coverImage: coverImage,
        rating: aggregated_rating,
        releaseDate: releaseDate,
    };
    return gameObj;
};

export default fetchNewGames;
