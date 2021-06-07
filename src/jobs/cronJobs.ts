import cron from "node-cron";
import fetchNewGames from "./fetchNewGames";
import log from "../logger";

cron.schedule("0 0 0 * * *", async () => {
    log.info("Fetching new games from api...");
    await fetchNewGames();
    log.info("Completed fetching new games");
});
