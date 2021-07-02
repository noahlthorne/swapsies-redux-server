import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

export const sign = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, options);
};

export const decode = (token: string) => {
    try {
        if (token == "undefined") {
            return { valid: false, expired: false, decoded: null };
        }
        const decoded = jwt.verify(token, privateKey);
        return { valid: true, expired: false, decoded };
    } catch (error) {
        console.error(error);
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
};
