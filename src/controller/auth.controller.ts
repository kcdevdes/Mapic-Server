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

	/**
	 * Register a new user
	 * @param req 
	 * @param res 
	 */
	register = async (req: Request, res: Response) => {
		let result: any;
		try {
			const userForm: IUser = {
				email: req.body.email,
				userId: req.body.userId,
				displayName: req.body.displayName,
				password: req.body.password,
				emailValid: false,
				createdAt: new Date(),
			};
			result = await this.authService.register(userForm);
			res.status(http_status_code.OK).json(result);
		} catch (error) {
			result = {
				message: "error",
				statusCode: http_status_code.NOT_ACCEPTABLE,
			};
			res.status(http_status_code.NOT_ACCEPTABLE).json(result);
		}
	};

	/**
	 * Attempts to log in and returns a JWT token if it succeeds.
	 * @param req 
	 * @param res 
	 */
	login = (req: Request, res: Response) => {
		
	};
}

export default AuthController;
