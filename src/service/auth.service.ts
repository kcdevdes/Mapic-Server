import User, { IUser } from "../model/user.model";
import ApiError from "../util/api.error";
import http_status_code from "http-status-codes";

class AuthService {
	async register(userInfo: IUser) {
		try {
			await User.create(userInfo);
		} catch (error) {
			throw new ApiError(
				http_status_code.BAD_REQUEST,
				(error as Error).message
			);
		}

		return { email: userInfo.email, userId: userInfo.userId };
	}

	login(userInfo: IUser) {
		try {
			const mUser = await User.findOne({
				email: userInfo.email,
			});
		}
	}

	verify() { }
	
	changePassword() {}
}

export default AuthService;
