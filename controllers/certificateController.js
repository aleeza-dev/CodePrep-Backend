import { randomUUID } from "crypto";
import User from "../models/User.js";
import Question from "../models/Question.js";
import { generateCertificate } from "../services/certificateService.js";

export const createCertificate = async (req, res) => {
  try {
    const { topic, score } = req.body;

    // Check required fields
    if (!topic || score === undefined) {
      return res.status(400).json({
        message: "Topic and score are required",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get total questions for this topic
    const totalQuestions = await Question.countDocuments({
      topic,
    });

    if (totalQuestions === 0) {
      return res.status(404).json({
        message: "No questions found for this topic",
      });
    }

    // Calculate accuracy
    const accuracy = Math.round(
      (score / totalQuestions) * 100
    );

    // Create unique certificate ID
    const certificateId = randomUUID();

    // Generate PDF
    const filePath = await generateCertificate({
      name: user.name,
      topic,
      score,
      totalQuestions,
      accuracy,
      certificateId,
    });

    // Correct PDF URL
    const downloadUrl =
      `http://localhost:${process.env.PORT}/certificates/certificate-${certificateId}.pdf`;

    // Send response
    res.status(201).json({
      message: "Certificate generated successfully",

      certificateId,

      filePath,

      downloadUrl,

      user: {
        name: user.name,
        email: user.email,
      },

      score,

      totalQuestions,

      accuracy,
    });

  } catch (error) {
    console.error(
      "Certificate error:",
      error
    );

    res.status(500).json({
      message: "Unable to generate certificate",
    });
  }
};