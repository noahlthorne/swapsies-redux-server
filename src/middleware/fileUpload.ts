import multer from "multer";
import path from "path";

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
        cb(error, path.join(__dirname, "../images"));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
        cb(null, `${name}-${Date.now()}.${ext}`);
    },
});

export default multer({ storage: storage }).single("image");
