import pgDatabase from "../config/DatabaseConfig.js";

// Retrieve all tokens
export const getAllTokens = async () => {
  try {
    const query = "SELECT * FROM tokens";
    const result = await pgDatabase.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error querying the tokens table", error);
    throw error;
  }
};

// Add a new token
export const updateTokens = async (minValue, maxValue) => {
  try {
    if (minValue < 0 || maxValue < 0) {
      throw new Error("Token values cannot be negative.");
    }
    if (minValue >= maxValue) {
      throw new Error("minValue must be less than maxValue.");
    }

    const query =
      "UPDATE tokens SET min_value = $1, max_value = $2 RETURNING *";
    const values = [minValue, maxValue];
    const result = await pgDatabase.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding a new token", error);
    throw error;
  }
};

// Delete a token by its min and max value
export const deleteToken = async (minValue, maxValue) => {
  try {
    const query =
      "DELETE FROM tokens WHERE min_value = $1 AND max_value = $2 RETURNING *";
    const values = [minValue, maxValue];
    const result = await pgDatabase.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Token not found or already deleted");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting token", error);
    throw error;
  }
};
