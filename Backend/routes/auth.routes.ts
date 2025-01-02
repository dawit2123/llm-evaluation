import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const authRoutes = Router();

// Public routes
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);

// Protected route
authRoutes.get("/me", authenticate, getUserProfile);
