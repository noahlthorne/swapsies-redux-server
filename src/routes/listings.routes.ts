import { Router } from "express";
import {
    createListingHandler,
    getGameListingsHandler,
} from "../controllers/listings.controller";
import { createListingSchema } from "../schemas/listing.schema";
import { validateRequest, requiresUser } from "../middleware";
import multer from "multer";

const listingsRouter = Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid =
            MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
        let error: Error | null = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
        cb(null, `${name}-${Date.now()}.${ext}`);
    },
});

// Create a listing
listingsRouter.post(
    "/api/games/:gameId/listings",
    [
        requiresUser,
        multer({ storage: storage }).single("image"),
        validateRequest(createListingSchema),
    ],
    createListingHandler
);

// Get a games listings
listingsRouter.get("/api/games/:gameId/listings", getGameListingsHandler);

export default listingsRouter;
