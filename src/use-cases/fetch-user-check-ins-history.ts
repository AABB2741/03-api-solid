import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryUseCaseProps {
	userId: string;
	page: number;
}

interface FetchUserCheckInsHistoryUseCaseResponse {
	checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		page,
	}: FetchUserCheckInsHistoryUseCaseProps): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page
		);

		return { checkIns };
	}
}
