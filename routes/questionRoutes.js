import express from "express";

import {
  getQuestionsByTopic,
} from "../controllers/questionController.js";

const router = express.Router();

router.get(
  "/:topic",
  getQuestionsByTopic
);

export default router;