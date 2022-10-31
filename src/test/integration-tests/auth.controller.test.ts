import "jest";
import express from "express";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import IntegrationHelpers from "../helpers/integration-helper";
import EnvManager from "../../tool/env-manager";

describe("AuthController status integration tests", () => {
	let app: express.Application;
	let testAccount: any;

	beforeAll(async () => {
		app = await IntegrationHelpers.getApp();
		testAccount = EnvManager.getTestAccount();
	});

	/**
	 * Test for signing up
	 */
	it("can sign up a new user", async () => {
		const test = await request(app)
			.post("/auth/register")
			.send({
				email: testAccount.email,
				password: testAccount.password,
				userId: testAccount.userId,
				displayName: testAccount.displayName,
			})
			.set("Accept", "application/json")
			.expect(StatusCodes.CREATED);

		expect(test.body).toEqual({
			email: testAccount.email,
			password: testAccount.password,
			userId: testAccount.userId,
			displayName: testAccount.displayName,
		});
	});

	/**
	 * Test for logging in
	 */
	it("can log in", async () => {
		const test = await request(app)
			.get("/auth/login")
			.auth(testAccount.email, testAccount.password)
			.set("Accept", "application/json")
			.expect(StatusCodes.OK);

		expect(test.text).toEqual({
			email: testAccount.email,
			password: testAccount.password,
			userId: testAccount.userId,
			displayName: testAccount.displayName,
		});
	});

	/**
	 * Verification of uniqueness of each innput
	 */
	it("can verify the uniqueness of my input", async () => {
		const test = await request(app)
			.get("/auth/verify")
			.send({
				email: testAccount.email,
				userId: "iamunique",
				displayName: "iamspecial",
			})
			.set("Accept", "application/json")
			.expect(StatusCodes.BAD_REQUEST);

		expect(test.body).toEqual({
			email: false,
			userId: true,
			displayName: true,
		});
	});
});
