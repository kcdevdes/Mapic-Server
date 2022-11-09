import { NextFunction, Request, Response } from "express";
import logger from "../util/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const logMessage = {
		address: req.ip,
		url: req.url,
		header: req.headers,
		body: req.body,
	};
	logger.info(logMessage);

	next();
};

export default loggerMiddleware;
