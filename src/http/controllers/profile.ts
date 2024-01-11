import { FastifyRequest } from "fastify";

import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function profile(request: FastifyRequest) {
	const getUserProfile = makeGetUserProfileUseCase();

	const { user } = await getUserProfile.execute({ userId: request.user.sub });

	return {
		...user,
		password_hash: undefined,
	};
}
