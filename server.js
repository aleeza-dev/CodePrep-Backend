import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// =========================
// LOAD ENVIRONMENT VARIABLES
// =========================

dotenv.config();

// =========================
// ROUTES
// =========================

import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import aiInterviewRoutes from "./routes/aiInterviewRoutes.js";

const app = express();

// =========================
// CHECK GEMINI API KEY
// =========================

console.log(
  "Gemini API Key:",
  process.env.GEMINI_API_KEY ? "Loaded ✓" : "Missing ✗"
);

// =========================
// ES MODULE PATH SETUP
// =========================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/progress", progressRoutes);

app.use(
  "/api/certificates",
  certificateRoutes
);

app.use(
  "/api/ai-interview",
  aiInterviewRoutes
);

// =========================
// CERTIFICATE PDF FILES
// =========================

app.use(
  "/certificates",
  express.static(
    path.join(__dirname, "certificates")
  )
);

// =========================
// DATABASE
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });