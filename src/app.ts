import express, { Application, Request, Response, NextFunction } from "express"; \
require("dotenv").config();
import connectDB from './config/db'

const app: Application = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("API Running");
});

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/games", require("./routes/api/games"));
app.use("/api/listings", require("./routes/api/listings"));
app.use("/api/swaps", require("./routes/api/swaps"));
