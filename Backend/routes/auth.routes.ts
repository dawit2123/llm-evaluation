import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const authRoutes = Router();

// Public routes
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/logout", authenticate, logoutUser);

// Protected route
authRoutes.get("/me", authenticate, getUserProfile);
