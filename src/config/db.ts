import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to mongo database...");
    } catch (error) {
        console.error(error.message);
        // Exit process if db fails to connect
        process.exit(1);
    }
};

export default connectDB;
