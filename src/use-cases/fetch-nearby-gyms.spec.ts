import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", async () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyGymsUseCase(gymsRepository);
	});

	it("should be able to search fetch nearby gyms", async () => {
		await gymsRepository.create({
			title: "Near Gym",
			description: null,
			phone: null,
			latitude: -22.8834364,
			longitude: -47.0680438,
		});

		await gymsRepository.create({
			title: "Far Gym",
			description: null,
			phone: null,
			latitude: -22.9657341,
			longitude: -47.0085394,
		});

		const { gyms } = await sut.execute({
			userLatitude: -22.8834365,
			userLongitude: -47.0680438,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({
				title: "Near Gym",
			}),
		]);
	});
});
