import "jest";
import express from "express";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import IntegrationHelpers from "../helpers/integration-helper";

describe("status integration tests", () => {
	let app: express.Application;

	beforeAll(async () => {
		app = await IntegrationHelpers.getApp();
	});

	it("can get 'pong!'", async () => {
		const test = await request(app)
			.get("/ping")
			.set("Accept", "application/json")
			.expect((res: request.Response) => {
				console.log(res.text);
			})
			.expect(StatusCodes.OK);

		expect(test.text).toEqual("pong!");
	});
});
