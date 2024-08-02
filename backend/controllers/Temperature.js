import express from "express";
import * as TemperatureQueries from "../db/TemperatureQueries.js";

const router = express.Router();

// GET endpoint to retrieve all temperatures
export const getAlltemperatures = async (req, res) => {
	try {
		const temperatures = await TemperatureQueries.getAllTemperatures();
		res.status(200).json(temperatures);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// POST endpoint to add a new temperature
export const addTemperature = async (req, res) => {
	try {
		const { temperature } = req.body;
		// Insert the temperature into the database
		const newTemperature = await TemperatureQueries.addTemperature(temperature);
		res.status(201).json({
			message: "Temperature added successfully",
			temperature: newTemperature,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// DELETE endpoint to delete a temperature
export const deleteTemperature = async (req, res) => {
	try {
		const { temperature } = req.params;
		const temperatureToDelete = parseFloat(temperature);

		// Delete the temperature from the database
		const deletedTemperature = await TemperatureQueries.deleteTemperature(
			temperatureToDelete
		);
		res.status(201).json({
			message: "Temperature deleted successfully",
		});
	} catch (error) {
		// If the temperature is not found or already deleted, send a not found response
		if (error.message === "Temperature not found or already deleted") {
			return res.status(404).json({ error: error.message });
		}
		res.status(500).json({ error: error.message });
	}
};

// POST endpoint to overwrite temperatures
export const overwriteTemperatures = async (req, res) => {
	try {
		const { temperatures } = req.body;

		if (!temperatures || temperatures.length === 0) {
			return res
				.status(400)
				.json({ error: "Temperature list cannot be empty." });
		}

		await TemperatureQueries.overwriteTemperatures(temperatures);
		res.status(200).json({ message: "Temperatures successfully updated." });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default router;
