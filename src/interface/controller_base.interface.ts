import express from "express";

interface IControllerBase {
	path: string;
	router: express.Router;
	initRoutes(): any;
}

export default IControllerBase;
