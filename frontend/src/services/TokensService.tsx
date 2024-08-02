/* eslint-disable no-useless-catch */
import authAxios from "../utilities/AuthAxios";

class TokensService {
  async getTokenRange() {
    try {
      const response = await authAxios.get("/response-tokens/");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTokenRange(minValue: number, maxValue: number) {
    try {
      const response = await authAxios.post("/response-tokens/update", {
        minValue,
        maxValue,
      });
      return response.status;
    } catch (error) {
      throw error;
    }
  }
}

export const tokensService = new TokensService();
