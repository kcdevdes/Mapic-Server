import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interface/controller_base.interface";
import HomeService from "../service/home.service";
import dotenv from "dotenv";
import EnvManager from "../tool/env-manager";

class HomeController implements IControllerBase {
	path: string;
	router: express.Router;
	private homeService: HomeService;

	constructor() {
		this.path = "/";
		this.router = express.Router();
		this.homeService = new HomeService();

		this.initRoutes();
	}

	public initRoutes() {
		if (EnvManager.isDevMode()) this.router.get("/ping", this.okSignal);
	}

	okSignal = (req: Request, res: Response) => {
		const message = "pong!";
		res.send(message);
	};
}

export default HomeController;
