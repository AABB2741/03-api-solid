import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create a gym", async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		const response = await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "Some description",
				phone: "119999999",
				latitude: -22.8834365,
				longitude: -47.0680438,
			});

		expect(response.statusCode).toEqual(201);
	});
});
