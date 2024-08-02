import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors({ origin: `http://localhost:${process.env.FRONTEND_PORT}` }));
app.use(express.json());
dotenv.config();

// Route files
import usersRoutes from "./routes/Users.js";
import aiModelsRoutes from "./routes/AiModels.js";
import temperatureRoutes from "./routes/Temperature.js";
import responseTokensRoutes from "./routes/ResponseTokens.js";
import comparisonRoutes from "./routes/Comparisons.js";

// Use routes
app.use("/users", usersRoutes);
app.use("/ai-models", aiModelsRoutes);
app.use("/temperatures", temperatureRoutes);
app.use("/response-tokens", responseTokensRoutes);
app.use("/comparisons", comparisonRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
