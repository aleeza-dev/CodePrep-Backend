import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const getAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

// =========================
// START AI INTERVIEW
// =========================

router.post("/start", async (req, res) => {
  try {
    const { topic = "General Programming" } = req.body;

    console.log("Starting AI interview...");
    console.log("Topic:", topic);

    const ai = getAI();

    const prompt = `
You are a professional technical interviewer for CodePrep.

Start a realistic coding interview.

Topic: ${topic}

Generate ONE coding interview question only.

Requirements:
- Beginner/intermediate level.
- Practical coding interview question.
- Do not provide the answer.
- Do not provide hints.
- Keep it clear and concise.
- Return ONLY the question.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    const question = response.text?.trim();

    if (!question) {
      throw new Error("Gemini returned an empty question");
    }

    console.log("AI Question:", question);

    res.json({
      success: true,
      question,
    });

  } catch (error) {
    console.error("AI interview start error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to start the AI interview.",
      error: error.message,
    });
  }
});

// =========================
// EVALUATE ANSWER
// =========================

router.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const ai = getAI();

    const prompt = `
You are a professional technical interviewer.

Evaluate this candidate's answer.

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

Evaluate based on:
1. Correctness
2. Understanding
3. Problem-solving approach
4. Clarity

Return ONLY valid JSON in this exact format:

{
  "score": 0,
  "correct": true,
  "feedback": "Short useful feedback",
  "improvement": "One or two specific suggestions"
}

Score must be between 0 and 10.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text);

    res.json({
      success: true,
      evaluation: result,
    });

  } catch (error) {
    console.error("AI evaluation error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to evaluate the answer.",
      error: error.message,
    });
  }
});

export default router;