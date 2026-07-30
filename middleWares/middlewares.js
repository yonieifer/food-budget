import { createError } from "../utils/utils.js";

export const checkBody = (req, res, next) => {
    if (!req.body) {
        const error = createError(400, "no body");
        throw error;
    }
    next();
};

export const checkQuery = (req, res, next) => {
    if (!req.query) {
        const error = createError(400, "no query");
        throw error;
    }
    next();
};

export const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
};

export const errorHandler = (err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message || "server internal error";
    res.status(status).send(message);
};
