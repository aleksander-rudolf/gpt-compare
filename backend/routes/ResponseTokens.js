import express from "express";
import {
	getAllTokens,
	updateTokens,
	deleteToken,
} from "../controllers/ResponseTokens.js";
import { verifyJwtToken } from "../middlewares/VerifyJwtToken.js";

const tokenRoutes = express.Router();

tokenRoutes.get("/", getAllTokens);
tokenRoutes.post("/update", verifyJwtToken, updateTokens);
tokenRoutes.delete("/delete/:minValue/:maxValue", verifyJwtToken, deleteToken);

export default tokenRoutes;
