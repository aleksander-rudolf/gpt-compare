import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { aiModelsService } from "../../services/AiModelsService";
import { temperaturesService } from "../../services/TemperaturesService";
import { tokensService } from "../../services/TokensService";
import { useLocation } from "react-router-dom";
import { comparisonsService } from "../../services/ComparisonsService";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "@material-tailwind/react";

interface AiModel {
	model_id: string;
	model_name: string;
}

interface FormState {
	temp1: string;
	model1: string;
	token1: string;
	temp2: string;
	model2: string;
	token2: string;
	prompt1: string;
	prompt2: string;
}

const Home = () => {
	const [aiModels, setAiModels] = useState<AiModel[]>([]);
	const [temperatures, setTemperatures] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [response1, setResponse1] = useState<string>("");
	const [response2, setResponse2] = useState<string>("");
	const [initialFormValues] = useState<FormState>({
		temp1: "",
		model1: "",
		token1: "",
		temp2: "",
		model2: "",
		token2: "",
		prompt1: "",
		prompt2: "",
	});

	const [responseTokens, setResponseTokens] = useState<{
		max_value: number;
		min_value: number;
	}>({ min_value: 10, max_value: 100 });
	const location = useLocation();
	const comparison = location.state?.comparison;

	const formik = useFormik({
		initialValues: initialFormValues,
		validationSchema: Yup.object({
			token1: Yup.number()
				.typeError("Please enter a valid positive number")
				.positive("Please enter a valid positive number")
				.min(
					responseTokens.min_value,
					`Please enter a number more than ${responseTokens.min_value}`
				)
				.max(
					responseTokens.max_value,
					`Please enter a number less than ${responseTokens.max_value}`
				)
				.required("Required"),

			token2: Yup.number()
				.typeError("Please enter a valid positive number")
				.positive("Please enter a valid positive number")
				.min(
					responseTokens.min_value,
					`Please enter a number more than ${responseTokens.min_value}`
				)
				.max(
					responseTokens.max_value,
					`Please enter a number less than ${responseTokens.max_value}`
				)
				.required("Required"),

			prompt2: Yup.string().required("Required"),
			prompt1: Yup.string().required("Required"),
		}),
		onSubmit: async (values) => {
			console.log(values);
			values.temp1 = values.temp1 || temperatures[0];
			values.model1 = values.model1 || (aiModels[0] && aiModels[0].model_id);
			values.temp2 = values.temp2 || temperatures[0];
			values.model2 = values.model2 || (aiModels[0] && aiModels[0].model_id);

			try {
				let userId = "";
				const token = localStorage.getItem("token");
				if (token) {
					const decoded: { userId: string } = jwtDecode(token);
					userId = decoded.userId;
				}

				setIsLoading(true);
				const comparisonData = await comparisonsService.createComparison(
					userId,
					values.temp1,
					values.temp2,
					values.token1,
					values.token2,
					values.model1,
					values.model2,
					values.prompt1,
					values.prompt2
				);
				console.log("Comparison created:", comparisonData);
				setResponse1(comparisonData.response1);
				setResponse2(comparisonData.response2);
			} catch (error) {
				console.error("Error creating comparison:", error);
			} finally {
				setIsLoading(false);
			}
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const models = await aiModelsService.getAllAiModels();
				setAiModels(models);
				const temps = await temperaturesService.getAllTemperatures();
				setTemperatures(temps);
				const tokens = await tokensService.getTokenRange();
				setResponseTokens(tokens);

				if (comparison) {
					formik.setValues({
						temp1: comparison.temperature1.toString(),
						model1: comparison.ai_model_id1,
						token1: comparison.token1.toString(),
						prompt1: comparison.prompt1,
						temp2: comparison.temperature2.toString(),
						model2: comparison.ai_model_id2,
						token2: comparison.token2.toString(),
						prompt2: comparison.prompt2,
					});
					setResponse1(comparison.response1);
					setResponse2(comparison.response2);
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, [comparison]);

	return (
		<div className="bg-gray-100 p-6">
			<form onSubmit={formik.handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-inter">
					<div className="bg-white p-5 rounded-lg shadow">
						<div className="mb-3">
							<span className="text-gray-600 text-base">Temperature</span>
							<select
								name="temp1"
								onChange={formik.handleChange}
								value={formik.values.temp1}
								className="w-full p-2 border border-gray-300 rounded"
							>
								{temperatures
									.slice()
									.sort((a, b) => a - b)
									.map((temperature, index) => (
										<option key={index} value={temperature}>
											{temperature}
										</option>
									))}
							</select>
						</div>
						<div className="mb-3">
							<span className="text-gray-600 text-base">GPT Models</span>
							<select
								name="model1"
								onChange={formik.handleChange}
								value={formik.values.model1}
								className="w-full p-2 border border-gray-300 rounded"
							>
								{aiModels.map((model) => (
									<option key={model.model_id} value={model.model_id}>
										{model.model_name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<span className="text-gray-600 text-base">Token</span>
							<input
								type="text"
								name="token1"
								placeholder={`Please enter a number from ${responseTokens.min_value} to  ${responseTokens.max_value}`}
								value={formik.values.token1}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full p-2 border ${
									formik.touched.token1 && formik.errors.token1
										? "border-red-500"
										: "border-gray-300"
								} rounded`}
							/>
							{formik.touched.token1 && formik.errors.token1 ? (
								<div className="text-red-500 text-sm">
									{formik.errors.token1}
								</div>
							) : null}
						</div>
						<div className="mb-3">
							<textarea
								name="prompt1"
								placeholder="Your text area"
								value={formik.values.prompt1}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full p-2 border ${
									formik.touched.prompt1 && formik.errors.prompt1
										? "border-red-500"
										: "border-gray-300"
								} rounded`}
								rows={parseInt("4")}
							></textarea>
							{formik.touched.prompt1 && formik.errors.prompt1 ? (
								<div className="text-red-500 text-sm">
									{formik.errors.prompt1}
								</div>
							) : null}
						</div>
					</div>
					<div className="bg-white p-5 rounded-lg shadow">
						<div className="mb-3">
							<span className="text-gray-600 text-base">Temperature</span>
							<select
								name="temp2"
								onChange={formik.handleChange}
								value={formik.values.temp2}
								className="w-full p-2 border border-gray-300 rounded"
							>
								{temperatures
									.slice()
									.sort((a, b) => a - b)
									.map((temperature, index) => (
										<option key={index} value={temperature}>
											{temperature}
										</option>
									))}
							</select>
						</div>
						<div className="mb-3">
							<span className="text-gray-600 text-base">GPT Models</span>
							<select
								name="model2"
								onChange={formik.handleChange}
								value={formik.values.model2}
								className="w-full p-2 border border-gray-300 rounded"
							>
								{aiModels.map((model) => (
									<option key={model.model_id} value={model.model_id}>
										{model.model_name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<span className="text-gray-600 text-base">Token</span>
							<input
								type="text"
								name="token2"
								placeholder={`Please enter a number from ${responseTokens.min_value} to  ${responseTokens.max_value}`}
								value={formik.values.token2}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full p-2 border ${
									formik.touched.token2 && formik.errors.token2
										? "border-red-500"
										: "border-gray-300"
								} rounded`}
							/>
							{formik.touched.token2 && formik.errors.token2 ? (
								<div className="text-red-500 text-sm">
									{formik.errors.token2}
								</div>
							) : null}
						</div>
						<div className="mb-3">
							<textarea
								name="prompt2"
								placeholder="Your text area"
								value={formik.values.prompt2}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full p-2 border ${
									formik.touched.prompt2 && formik.errors.prompt2
										? "border-red-500"
										: "border-gray-300"
								} rounded`}
								rows={parseInt("4")}
							></textarea>
							{formik.touched.prompt2 && formik.errors.prompt2 ? (
								<div className="text-red-500 text-sm">
									{formik.errors.prompt2}
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center pt-8 ml-5">
					<button
						type="submit"
						className="mr-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-inter">
				<div className="bg-white p-5 rounded-lg  shadow  mt-8 h-64 overflow-auto">
					<span className="mb-px text-gray-600 text-base">Output</span>
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<Spinner color="blue" />
						</div>
					) : (
						<div>{response1}</div>
					)}
				</div>
				<div className="bg-white p-5 rounded-lg  shadow  mt-8 h-64 overflow-auto">
					<span className="mb-px text-gray-600 text-base">Output</span>
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<Spinner color="blue" />
						</div>
					) : (
						<div>{response2}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
