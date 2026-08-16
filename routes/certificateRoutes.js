import express from "express";

import {
  createCertificate,
} from "../controllers/certificateController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createCertificate
);

export default router;