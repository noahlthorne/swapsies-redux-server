import mongoose from "mongoose";
import config from "config";
import log from "../logger";

const connectDB = async () => {
    const dbUri = config.get("dbUri") as string;
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        log.info("Successfully connected to mongo database");
    } catch (error) {
        log.error(error.message);
        // Exit process if db fails to connect
        process.exit(1);
    }
};

export default connectDB;
