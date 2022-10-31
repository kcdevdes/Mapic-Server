import * as express from "express";
import { Application } from "express";
import IControllerBase from "./interface/controller_base.interface";

class App {
	public app: Application;
	public port: number;

	constructor(appInit: { port: number; middleWares: any; controllers: any }) {
		this.app = express.default();
		this.port = appInit.port;

		this.middlewares(appInit.middleWares);
		this.routes(appInit.controllers);
		this.assets();
		this.template();
		this.handleError();
	}

	private middlewares(middleWares: {
		forEach: (arg0: (middleWare: any) => void) => void;
	}) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}

	private routes(controllers: {
		forEach: (arg0: (controller: IControllerBase) => void) => void;
	}) {
		controllers.forEach((controller) => {
			this.app.use(controller.path, controller.router);
		});
	}

	private assets() {}

	private template() {}

	private handleError() {}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the http://localhost:${this.port}`);
		});
	}
}

export default App;
