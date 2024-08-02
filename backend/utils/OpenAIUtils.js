import OpenAI from "openai";

const openai = new OpenAI();

export const generateResponseWithOpenAI = async (
	prompt,
	modelName,
	temperature,
	maxTokens
) => {
	const completion = await openai.chat.completions.create({
		messages: [{ role: "user", content: prompt }],
		model: modelName,
		max_tokens: maxTokens,
		temperature: temperature,
	});

	console.log(completion.choices[0]);

	return completion.choices[0].message.content;
};
