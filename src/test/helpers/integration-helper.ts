import * as express from "express";
import * as bodyParser from "body-parser";
import App from "../../app";
import HomeController from "../../controller/home.controller";
import loggerMiddleware from "../../middleware/logger.middleware";
// import Environment from '../../src/environments/environment';
// import logger from '../../middleware/logger';

export default class IntegrationHelpers {
	public static appInstance: express.Application;

	public static getApp(): express.Application {
		if (this.appInstance) {
			return this.appInstance;
		}

		const app = new App({
			port: 3000,
			controllers: [new HomeController()],
			middleWares: [
				bodyParser.json(),
				bodyParser.urlencoded({ extended: true }),
				loggerMiddleware,
			],
		});

		return app.app;
	}

	// public clearDatabase(): void {
	// 	logger.info('clear the database');
	// }
}
