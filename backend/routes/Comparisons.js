import express from "express";
import {
	createComparison,
	deleteComparison,
	getComparisonsByUserId,
} from "../controllers/Comparisons.js";
import { verifyJwtToken } from "../middlewares/VerifyJwtToken.js";

const comparisonsRoutes = express.Router();

comparisonsRoutes.get(
	"/get-comparison/:userId",
	verifyJwtToken,
	getComparisonsByUserId
);
comparisonsRoutes.post("/create-comparison/", createComparison);
comparisonsRoutes.delete(
	"/delete-comparison/:id",
	verifyJwtToken,
	deleteComparison
);

export default comparisonsRoutes;
