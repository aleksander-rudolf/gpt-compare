/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import authAxios from "../utilities/AuthAxios";

class AiModelsService {
	async getAllAiModels() {
		try {
			const response = await authAxios.get("/ai-models/");
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async addAiModel(newModelData: any) {
		try {
			const response = await authAxios.post("/ai-models/add", newModelData);
			return response.data; // Return the newly added AI model data
		} catch (error) {
			throw error;
		}
	}

	async deleteAiModel(modelId: number) {
		try {
			const response = await authAxios.delete(`/ai-models/delete/${modelId}`);
			return response.data; // Often, APIs return the deleted object or a success message
		} catch (error) {
			throw error;
		}
	}
}

export const aiModelsService = new AiModelsService();
