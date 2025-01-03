// routes/prompt.routes.ts
import express from "express";
import { submitPrompt, reportAnalysis } from "../controllers/prompt.controller";
import { authenticate } from "../middlewares/auth.middleware";

const promptRoutes = express.Router();

promptRoutes.get("/analytics", authenticate, reportAnalysis);
promptRoutes.post("/", authenticate, submitPrompt);

export default promptRoutes;
