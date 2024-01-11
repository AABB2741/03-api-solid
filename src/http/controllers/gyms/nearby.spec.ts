import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { app } from "@/app";

import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search nearby gyms (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to list nearby gyms", async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "JavaScript Gym",
				description: "Some description",
				phone: "119999999",
				latitude: -22.8834364,
				longitude: -47.0680438,
			});

		await request(app.server)
			.post("/gyms")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "TypeScript Gym",
				description: "Some description",
				phone: "119999999",
				latitude: -22.9657341,
				longitude: -47.0085394,
			});

		const response = await request(app.server)
			.get("/gyms/nearby")
			.query({
				latitude: -22.8834364,
				longitude: -47.0680438,
			})
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
