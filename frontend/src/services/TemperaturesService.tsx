/* eslint-disable no-useless-catch */
import authAxios from "../utilities/AuthAxios";

class TemperaturesService {
	async getAllTemperatures() {
		try {
			const response = await authAxios.get("/temperatures/");
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async addTemperature(temperature: number) {
		try {
			const response = await authAxios.post("/temperatures/add", {
				temperature,
			});
			return response.status;
		} catch (error) {
			throw error;
		}
	}

	async deleteTemperature(temperature: number) {
		try {
			const response = await authAxios.delete(
				`/temperatures/delete/${temperature}`
			);
			return response.status;
		} catch (error) {
			throw error;
		}
	}
}

export const temperaturesService = new TemperaturesService();
