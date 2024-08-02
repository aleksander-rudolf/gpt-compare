import generateJwtToken from "../middlewares/GenerateJwtToken.js";
import passport from "passport";
import initializePassport from "../config/PassportConfig.js";
import bcrypt from "bcryptjs";
import * as userQueries from "../db/UserQueries.js";

initializePassport(passport);

export const userLogin = (req, res) => {
  const { username, password } = req.body;

  // Initialize an object to hold errors for missing fields
  const fieldErrors = {};

  if (!username) fieldErrors.username = "Missing required field";
  if (!password) fieldErrors.password = "Missing required field";

  // Check if there are any errors and return them
  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json(fieldErrors);
  }

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(401).json({
        username: "Invalid username or password",
        password: "Invalid username or password",
      });
    }
    // Generate a JWT token containing only the user id and send it back to the client
    const token = generateJwtToken(user.id, user.role);
    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
      role: user.role,
    });
  })(req, res);
};

export const createUser = async (req, res) => {
  console.log("REQ BODY------>", req.body);
  const { username, password, email, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await userQueries.findUserByEmail(email);

    if (userExists) {
      throw new Error("Invalid email address");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await userQueries.createUser(
      username,
      hashedPassword,
      email,
      role
    );

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userQueries.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userQueries.findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, username, email, role } = req.body;

    const updatedUser = await userQueries.updateUserDetails(
      id,
      username,
      email,
      role
    );

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await userQueries.updateUserRole(id, role);

    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User role updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user role", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    const user = await userQueries.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await userQueries.updateUserPassword(
      userId,
      hashedPassword
    );

    if (updatedUser) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(500).json({ message: "Error updating password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userQueries.deleteUser(id);

    if (deletedUser) {
      res
        .status(200)
        .json({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
