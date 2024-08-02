/* eslint-disable no-useless-catch */
import authAxios from "../utilities/AuthAxios";

class ComparisonsService {
	async getAllComparisonsById(userId: string) {
		try {
			const response = await authAxios.get(
				`/comparisons/get-comparison/${userId}`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async createComparison(
		userId: string,
		temp1: string,
		temp2: string,
		token1: string,
		token2: string,
		modelId1: string,
		modelId2: string,
		prompt1: string,
		prompt2: string
	) {
		try {
			const response = await authAxios.post("/comparisons/create-comparison", {
				userId,
				temp1,
				temp2,
				token1,
				token2,
				modelId1,
				modelId2,
				prompt1,
				prompt2,
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async deleteComparison(comparisonId: string) {
		try {
			const response = await authAxios.delete(
				`/comparisons/delete-comparison/${comparisonId}`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export const comparisonsService = new ComparisonsService();
