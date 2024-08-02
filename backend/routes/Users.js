import express from "express";
import {
  userLogin,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateUserRole,
  changePassword,
  deleteUser,
} from "../controllers/Users.js";
import { verifyJwtToken } from "../middlewares/VerifyJwtToken.js";
const usersRoutes = express.Router();

usersRoutes.post("/create-user", createUser);
usersRoutes.post("/user-login", userLogin);
usersRoutes.get("/get-user/:id", getUser);
usersRoutes.get("/get-all-users", verifyJwtToken, getAllUsers);
usersRoutes.put("/user-update", verifyJwtToken, updateUser);
usersRoutes.put("/update-role/:id", verifyJwtToken, updateUserRole);
usersRoutes.put("/change-password", changePassword);
usersRoutes.delete("/delete-user/:id", verifyJwtToken, deleteUser);

export default usersRoutes;
