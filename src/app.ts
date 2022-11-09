import * as express from "express";
import { Application } from "express";
import IControllerBase from "./interface/controller_base.interface";
import logger from "./logger";
import http_status_code from "http-status-codes";
import config from "./config/config";
import ApiError from "./util/api.error";
import mongoose from "mongoose";

class App {
	public app: Application;
	public port: string;

	constructor(appInit: { port: string; middleWares: any; controllers: any }) {
		this.app = express.default();
		this.port = appInit.port;

		this.dbConnection();
		this.middlewares(appInit.middleWares);
		this.routes(appInit.controllers);
		this.assets();
		this.template();
		this.unknownAPIRequestHandler();
		this.errorHandler();
	}

	dbConnection = async () => {
		try {
			const url: string = config.mongodb.url!;
			await mongoose.connect(
				url,
				{
					authSource: config.mongodb.adminSource,
					auth: {
						username: config.mongodb.username,
						password: config.mongodb.password,
					},
				},
				() => {
					logger.info("MongoDB Connected");
				}
			);
		} catch (error) {
			logger.error((error as Error).message);
		}
	};

	private middlewares(middleWares: {
		forEach: (arg0: (middleWare: any) => void) => void;
	}) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}

	private routes(controllers: {
		forEach: (arg0: (controller: IControllerBase) => void) => void;
	}) {
		controllers.forEach((controller) => {
			this.app.use(controller.path, controller.router);
		});
	}

	private assets() {}

	private template() {}

	private unknownAPIRequestHandler() {
		this.app.use(
			(
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				next(new ApiError(http_status_code.NOT_FOUND, "NOT_FOUND"));
			}
		);
	}

	private errorHandler() {
		this.app.use(
			(
				err: ApiError,
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				let { statusCode, message } = err;
				const errMessage = {
					address: req.ip,
					url: req.url,
					header: req.headers,
					body: req.body,
					error: message,
					statusCode: statusCode,
					stack: err.stack,
					isOperational: err.isOperational,
				};

				if (config.env === "production" && !err.isOperational) {
					statusCode = http_status_code.INTERNAL_SERVER_ERROR;
					message = "INTERNAL_SERVER_ERROR";
				}

				res.locals.errorMessage = err.message;

				const response = {
					message,
					statusCode: statusCode,
					...(config.env === "development" && { stack: err.stack }),
				};

				logger.error(errMessage);
				res.status(statusCode).send(response);
			}
		);
	}

	public listen() {
		this.app.listen(this.port, () => {
			const logMessage = {
				serverStatus: "running",
				port: this.port,
				version: config.version,
			};

			logger.info(logMessage);
		});
	}
}

export default App;
