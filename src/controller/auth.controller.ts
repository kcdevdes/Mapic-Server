import { Router, Request, Response } from "express";
import IControllerBase from "../interface/controller_base.interface";

class AuthController implements IControllerBase {
	path: string;
	router: Router;

	constructor() {
		this.path = "/auth";
		this.router = Router();

		this.initRoutes();
	}

	public initRoutes() {
		this.router.post("/register", this.register);
		this.router.get("/login", this.login);
	}

	register = (req: Request, res: Response) => {
		res.send("OK");
	};
	login = (req: Request, res: Response) => {
		res.send("Hello World!");
	};
}

export default AuthController;
