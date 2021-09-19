import { Request, Response, NextFunction } from "express";
import ResponseError from "../errors/Response";

class GlobalMiddleware {
    notFound(req: Request, res: Response, next: NextFunction) {
        const notFoundError: ResponseError = new Error('Not Found.');
        notFoundError.status = 404;

        next(notFoundError);
    }

    catchAll(error: ResponseError, req: Request, res: Response, next: NextFunction) {
        console.log(error)
        return res.status(error.status || 500).json({ error: error.message });
    }
}

export default new GlobalMiddleware();