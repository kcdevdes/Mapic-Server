import App from "./app";

import * as bodyParser from "body-parser";
import loggerMiddleware from "./middleware/logger.middleware";

import HomeController from "./controller/home.controller";
import AuthController from "./controller/auth.controller";

const app = new App({
	port: 3000,
	controllers: [new HomeController(), new AuthController()],
	middleWares: [
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true }),
		loggerMiddleware,
	],
});

app.listen();
