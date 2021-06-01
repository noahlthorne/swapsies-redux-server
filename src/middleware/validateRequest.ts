import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validate =
    (schema: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            return next();
        } catch (error) {
            log.error(error);
            return res.status(400).send(error.errors);
        }
    };

export default validate;
