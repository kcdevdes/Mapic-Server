import { Router, Request, Response } from "express";
import IControllerBase from "../interface/controller_base.interface";
import { IUser } from "../model/user.model";
import AuthService from "../service/auth.service";
import http_status_code from "http-status-codes";

class AuthController implements IControllerBase {
	path: string;
	router: Router;
	authService: AuthService;

	constructor() {
		this.path = "/auth";
		this.router = Router();
		this.authService = new AuthService();

		this.initRoutes();
	}

	public initRoutes() {
		this.router.post("/register", this.register);
		this.router.get("/login", this.login);
	}

	register = async (req: Request, res: Response) => {
		const userForm: IUser = {
			email: "example@example.com",
			userId: "admin",
			displayName: "ADMINISTRATOR",
			password: "secretpassword",
			emailValid: false,
			createdAt: new Date(),
		};
		const result = await this.authService.register(userForm);
		res.status(http_status_code.OK).json(result);
	};
	login = (req: Request, res: Response) => {};
}

export default AuthController;
