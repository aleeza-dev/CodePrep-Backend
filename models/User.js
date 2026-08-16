import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },
    isPremium: {
  type: Boolean,
  default: false,
},

subscriptionPlan: {
  type: String,
  default: "free",
},

subscriptionStart: {
  type: Date,
  default: null,
},

subscriptionEnd: {
  type: Date,
  default: null,
},

    // =========================
    // PREMIUM SUBSCRIPTION
    // =========================

    isPremium: {
      type: Boolean,
      default: false,
    },

    subscriptionStatus: {
      type: String,
      enum: ["free", "active", "expired", "cancelled"],
      default: "free",
    },

    subscriptionStart: {
      type: Date,
      default: null,
    },

    subscriptionEnd: {
      type: Date,
      default: null,
    },

    subscriptionPlan: {
      type: String,
      enum: ["free", "monthly"],
      default: "free",
    },

    subscriptionPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;