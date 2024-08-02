import pgDatabase from "../config/DatabaseConfig.js";

// Retrieve all temperatures
export const getAllTemperatures = async () => {
  try {
    const query = "SELECT * FROM temperatures";
    const result = await pgDatabase.query(query);
    return result.rows.map((row) => row.temperature);
  } catch (error) {
    console.error("Error querying the temperatures table", error);
    throw error;
  }
};

// Overwrite the temperatures table with a new list
export const overwriteTemperatures = async (temperatures) => {
  try {
    // Start transaction
    await pgDatabase.query("BEGIN");

    // Delete all current entries
    await pgDatabase.query("DELETE FROM temperatures");

    // Insert new temperatures ensuring the list is not empty
    if (temperatures.length === 0) {
      throw new Error("Temperature list cannot be empty.");
    }

    for (const temperature of temperatures) {
      await pgDatabase.query(
        "INSERT INTO temperatures (temperature) VALUES ($1)",
        [temperature]
      );
    }

    // Commit transaction
    await pgDatabase.query("COMMIT");
  } catch (error) {
    await pgDatabase.query("ROLLBACK");
    console.error("Error overwriting the temperatures table", error);
    throw error;
  }
};

// Insert a new temperature
export const addTemperature = async (temperature) => {
  try {
    // Ensure the temperature is within the allowed range
    if (temperature < 0.0 || temperature > 1.0) {
      throw new Error("Temperature must be between 0.0 and 1.0");
    }

    const query =
      "INSERT INTO temperatures (temperature) VALUES ($1) RETURNING *";
    const values = [temperature];
    const result = await pgDatabase.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting temperature", error);
    throw error;
  }
};

// Delete a temperature by its value
export const deleteTemperature = async (temperature) => {
  try {
    const query = "DELETE FROM temperatures WHERE temperature = $1 RETURNING *";
    const values = [temperature];
    const result = await pgDatabase.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("Temperature not found or already deleted");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting temperature", error);
    throw error;
  }
};
