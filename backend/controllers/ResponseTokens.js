import express from "express";
import * as ResponseTokensQueries from "../db/ResponseTokensQueries.js";

const router = express.Router();

// GET endpoint to retrieve all tokens
export const getAllTokens = async (req, res) => {
	try {
		const tokens = await ResponseTokensQueries.getAllTokens();
		res.status(200).json(tokens);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// POST endpoint to add a new token
export const updateTokens = async (req, res) => {
	try {
		const { minValue, maxValue } = req.body;

		const newToken = await ResponseTokensQueries.updateTokens(
			minValue,
			maxValue
		);
		res.status(201).json({
			message: "Token updated successfully",
			token: newToken,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// DELETE endpoint to delete a token, using URL parameters
export const deleteToken = async (req, res) => {
	try {
		const { minValue, maxValue } = req.params;
		console.log("minValue", minValue);
		console.log("maxValue", maxValue);
		const deletedToken = await ResponseTokensQueries.deleteToken(
			minValue,
			maxValue
		);
		res.status(200).json({
			message: "Token deleted successfully",
			token: deletedToken,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default router;
