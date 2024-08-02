import express from "express";
import {
  getAllAIModels,
  addAIModel,
  deleteAIModel,
} from "../controllers/AiModels.js";
import { verifyJwtToken } from "../middlewares/VerifyJwtToken.js";

const aiModelsRoutes = express.Router();

aiModelsRoutes.get("/", getAllAIModels);
aiModelsRoutes.post("/add", verifyJwtToken, addAIModel);
aiModelsRoutes.delete("/delete/:modelId", verifyJwtToken, deleteAIModel);

export default aiModelsRoutes;
