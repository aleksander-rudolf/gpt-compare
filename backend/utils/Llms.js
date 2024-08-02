import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";

export function createModel(modelName, { temperature, maxTokens }) {
	// Check if modelName includes 'gpt' indicating an OpenAI model
	if (modelName.includes("gpt")) {
		return new ChatOpenAI({
			modelName: modelName,
			temperature: temperature,
			maxTokens: maxTokens,
		});
	}
	// Check if modelName includes 'claude' indicating an Anthropic model
	else if (modelName.includes("claude")) {
		return new ChatAnthropic({
			modelName: modelName,
			temperature: temperature,
			maxTokens: maxTokens,
		});
	} else {
		throw new Error(`Model ${modelName} is not recognized or supported.`);
	}
}
