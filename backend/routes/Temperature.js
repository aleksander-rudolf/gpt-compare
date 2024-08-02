import express from "express";
import {
	getAlltemperatures,
	addTemperature,
	deleteTemperature,
} from "../controllers/Temperature.js";
import { verifyJwtToken } from "../middlewares/VerifyJwtToken.js";

const temperatureRoutes = express.Router();

temperatureRoutes.get("/", getAlltemperatures);
temperatureRoutes.post("/add", verifyJwtToken, addTemperature);
temperatureRoutes.delete(
	"/delete/:temperature",
	verifyJwtToken,
	deleteTemperature
);

export default temperatureRoutes;
