import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    selectedAnswer: {
      type: String,
      required: true,
    },

    correct: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.model(
  "Progress",
  progressSchema
);

export default Progress;