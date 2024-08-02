import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createModel } from "./Llms.js";

export async function callChain(prompt, modelName, temperature, maxTokens) {
	try {
		maxTokens = parseInt(maxTokens);
		temperature = parseFloat(temperature);
		const givenModel = createModel(modelName, {
			temperature: temperature,
			maxTokens: maxTokens,
		});
		console.log("Given model: ", givenModel.modelName);

		// An prompt with no input variables
		const noInputPrompt = new PromptTemplate({
			inputVariables: [],
			template: prompt,
		});
		// console.log("Prompt: ", noInputPrompt);
		const formattedNoInputPrompt = await noInputPrompt.format();
		console.log("Prompt: ", formattedNoInputPrompt);

		const chain = RunnableSequence.from([
			noInputPrompt,
			givenModel,
			new StringOutputParser(),
		]);

		console.log("llm call running...");
		const result = await chain.invoke();
		console.log("llm call done.");

		console.log("Result: ", result);
		return result;
	} catch (error) {
		console.log("llm call error: ", error);
		throw new Error(`Error calling chain: ${error}`);
	}
}
