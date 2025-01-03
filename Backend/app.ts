import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRoutes } from "./routes/auth.routes";
import promptRoutes from "./routes/prompt.routes";

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: any, res: any) =>
  res.send("Welcome to the LLM Evaluation API")
);
app.use("/api/prompt", promptRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
