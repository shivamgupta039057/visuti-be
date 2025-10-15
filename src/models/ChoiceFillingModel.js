const mongoose = require("mongoose");

const choiceFillingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String, // Example: "NEET UG/ NEET PG"
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Learn More",
    },
    buttonLink: {
      type: String,
      required: true,
    },
    icon: {
      type: String, 
    },
    category: {
      type: String,
      enum: ["NEET UG", "NEET PG", "IIT", "General"],
      default: "General",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ChoiceFilling = mongoose.model("ChoiceFilling", choiceFillingSchema);
module.exports = ChoiceFilling;
