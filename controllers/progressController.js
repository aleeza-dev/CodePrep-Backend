import Progress from "../models/Progress.js";
import Question from "../models/Question.js";

// ==========================================
// SAVE PROGRESS
// ==========================================

export const saveProgress = async (req, res) => {
  try {
    const {
      questionId,
      topic,
      selectedAnswer,
      correct,
    } = req.body;

    const userId = req.user.userId;

    // Check required fields
    if (
      !questionId ||
      !topic ||
      !selectedAnswer
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // Check if progress already exists
    const existingProgress =
      await Progress.findOne({
        user: userId,
        question: questionId,
      });

    // Update existing progress
    if (existingProgress) {
      existingProgress.selectedAnswer =
        selectedAnswer;

      existingProgress.correct = correct;

      await existingProgress.save();

      return res.status(200).json({
        message: "Progress updated",
        progress: existingProgress,
      });
    }

    // Create new progress
    const progress = await Progress.create({
      user: userId,
      question: questionId,
      topic,
      selectedAnswer,
      correct,
    });

    res.status(201).json({
      message: "Progress saved",
      progress,
    });

  } catch (error) {
    console.error(
      "Save progress error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// GET OVERALL PROGRESS
// ==========================================

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const progress = await Progress.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    const totalQuestions =
      await Question.countDocuments();

    const completedQuestions =
      progress.length;

    const correctAnswers =
      progress.filter(
        (item) => item.correct === true
      ).length;

    const accuracy =
      completedQuestions > 0
        ? Math.round(
            (correctAnswers /
              completedQuestions) *
              100
          )
        : 0;

    res.status(200).json({
      totalQuestions,
      completedQuestions,
      correctAnswers,
      accuracy,
      progress,
    });

  } catch (error) {
    console.error(
      "Get progress error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// GET TOPIC-WISE PROGRESS
// ==========================================

export const getTopicProgress = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    const topics = [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Trees",
      "Graphs",
    ];

    const topicProgress = [];

    for (const topic of topics) {

      // Total questions for this topic
      const totalQuestions =
        await Question.countDocuments({
          topic: topic,
        });

      // Completed questions for this user
      const completedQuestions =
        await Progress.countDocuments({
          user: userId,
          topic: topic,
        });

      // Correct answers
      const correctAnswers =
        await Progress.countDocuments({
          user: userId,
          topic: topic,
          correct: true,
        });

      // Percentage
      const percentage =
        totalQuestions > 0
          ? Math.round(
              (completedQuestions /
                totalQuestions) *
                100
            )
          : 0;

      topicProgress.push({
        topic,
        totalQuestions,
        completedQuestions,
        correctAnswers,
        percentage,
      });
    }

    res.status(200).json(
      topicProgress
    );

  } catch (error) {
    console.error(
      "Topic progress error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};