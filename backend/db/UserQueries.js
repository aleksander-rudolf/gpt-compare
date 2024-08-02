import pgDatabase from "../config/DatabaseConfig.js";

export const findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];

    // Execute the query
    const result = await pgDatabase.query(query, values);

    if (result.rows.length) {
      console.log("User found:", result.rows[0]);

      // Returning the first user found
      return result.rows[0];
    } else {
      // No user found with that email
      console.log("No user found with that email.");
      return null;
    }
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];

    // Execute the query
    const result = await pgDatabase.query(query, values);

    if (result.rows.length) {
      console.log("User found:", result.rows[0]);

      // Returning the first user found
      return result.rows[0];
    } else {
      // No user found with that username
      console.log("No user found with that username.");
      return null;
    }
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];
    const result = await pgDatabase.query(query, values);

    if (result.rows.length) {
      console.log("User found:", result.rows[0]);

      // Returning the first user found
      return result.rows[0];
    } else {
      // No user found with that id
      console.log("No user found with that id.");
      return null;
    }
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export const findAllUsers = async () => {
  try {
    const query = "SELECT * FROM users";
    const result = await pgDatabase.query(query);

    if (result.rows.length) {
      return result.rows;
    } else {
      // No users found
      console.log("No users found.");
      return [];
    }
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export const createUser = async (username, password, email, role) => {
  try {
    const query =
      "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [username, password, email, role];

    // Execute the query
    const result = await pgDatabase.query(query, values);

    if (result.rows.length) {
      console.log("User created:", result.rows[0]);

      // Returning the newly created user
      return result.rows[0];
    } else {
      // No user created
      console.log("No user created.");
      return null;
    }
  } catch (error) {
    console.error("Error querying the database", error);
    throw error;
  }
};

export const updateUserDetails = async (id, username, email, role) => {
  try {
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (role) updates.role = role;

    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}" = $${index + 2}`)
      .join(", ");

    const query = `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`;
    const values = [id, ...Object.values(updates)];

    const result = await pgDatabase.query(query, values);

    if (result.rows.length) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating the user in the dataaaabase", error);
    throw error;
  }
};

export const updateUserRole = async (id, role) => {
  const query = "UPDATE users SET role = $2 WHERE id = $1 RETURNING *";
  const values = [id, role];

  try {
    const result = await pgDatabase.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user role in the database", error);
    throw error;
  }
};

export const updateUserPassword = async (id, hashedPassword) => {
  const query = "UPDATE users SET password = $2 WHERE id = $1 RETURNING *";
  const values = [id, hashedPassword];

  try {
    const result = await pgDatabase.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user password in the database", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const values = [id];

  try {
    const result = await pgDatabase.query(query, values);
    if (result.rows.length) {
      console.log("User deleted:", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No user found with that id.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting user from the database", error);
    throw error;
  }
};
