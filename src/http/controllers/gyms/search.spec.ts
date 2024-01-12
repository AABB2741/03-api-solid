import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search gyms by title", async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "Some description",
				phone: "119999999",
				latitude: -22.8834365,
				longitude: -47.0680438,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "TypeScript Gym",
				description: "Some description",
				phone: "119999999",
				latitude: -22.8834365,
				longitude: -47.0680438,
			});

		const response = await request(app.server)
			.get("/gyms/search")
			.query({ q: "JavaScript" })
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "JavaScript Gym",
			}),
		]);
	});
});
