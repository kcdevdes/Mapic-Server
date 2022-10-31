import HomeService from "../../service/home.service";

describe("HomeService", () => {
	let homeService: HomeService;

	beforeAll(async () => {
		homeService = new HomeService();
	});

	it("should return 'Hello World!'", () => {
		expect(homeService.getHelloWorld()).toEqual("Hello World!");
	});
});
