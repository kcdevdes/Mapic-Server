import AuthService from "../../service/auth.service";

describe("HomeService", () => {
	let authService: AuthService;

	beforeAll(async () => {
		authService = new AuthService();
	});

	it("should return 'Hello World!'", () => {
		expect(authService.register).toEqual("Hello World!");
	});
});
