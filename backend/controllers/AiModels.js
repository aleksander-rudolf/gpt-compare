import * as AIModelQueries from "../db/AIModelQueries.js";

// GET endpoint to retrieve all AI models
export const getAllAIModels = async (req, res) => {
  try {
    const aiModels = await AIModelQueries.getAllAIModels();
    res.status(200).json(aiModels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST endpoint to add a new AI model
export const addAIModel = async (req, res) => {
  try {
    const { modelName, description } = req.body;
    const newModel = await AIModelQueries.addAIModel(modelName, description);
    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE endpoint to delete an AI model
export const deleteAIModel = async (req, res) => {
  try {
    const { modelId } = req.params;
    const deletedModel = await AIModelQueries.deleteAIModel(modelId);
    res.status(201).json(deletedModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
