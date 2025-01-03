import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import promptRoutes from "./routes/prompt.routes";

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend app to connect
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify which HTTP methods to allow
  credentials: true, // Allow cookies to be sent from the frontend
};

// Use the CORS middleware
app.use(cors(corsOptions)); // Routes
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
