import express from "express";

import {
  saveProgress,
  getProgress,
  getTopicProgress,
} from "../controllers/progressController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Save progress
router.post(
  "/",
  authMiddleware,
  saveProgress
);

// Get overall progress
router.get(
  "/",
  authMiddleware,
  getProgress
);

// Get topic-wise progress
router.get(
  "/topics",
  authMiddleware,
  getTopicProgress
);

export default router;