import App from "./app";

import * as bodyParser from "body-parser";

import AuthController from "./controller/auth.controller";
import loggerMiddleware from "./middleware/logger.middleware";
import config from "../src/config/config";

const app = new App({
	port: config.port || "3000",
	controllers: [new AuthController()],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true }),
		loggerMiddleware,
	],
});

app.listen();
