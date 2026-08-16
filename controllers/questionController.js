import Question from "../models/Question.js";

// Get questions by topic
export const getQuestionsByTopic = async (
  req,
  res
) => {
  try {
    const { topic } = req.params;

    const questions = await Question.find({
      topic: {
        $regex: new RegExp(`^${topic}$`, "i"),
      },
    });

    res.status(200).json(questions);

  } catch (error) {
    console.error(
      "Get questions error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};