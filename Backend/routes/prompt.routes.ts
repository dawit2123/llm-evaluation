// routes/prompt.routes.ts
import express from "express";
import { submitPrompt } from "../controllers/prompt.controller";
import { authenticate } from "../middlewares/auth.middleware";

const promptRoutes = express.Router();

promptRoutes.post("/", authenticate, submitPrompt);

export default promptRoutes;
