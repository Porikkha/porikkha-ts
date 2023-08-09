import { Schema, model, models } from "mongoose";

const choiceSchema = Schema({
  text: { type: String, required: true },
  id: { type: Number, required: true },
});

const questionSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  choices: [choiceSchema],
  type: {
    type: String,
    enum: ["single-choice", "multiple-choice", "short-answer"],
    required: true,
  },
  points: { type: Number, default: 1 },
  answerId: [Number],
});

const Question = models.Question || model("Question", questionSchema);

export default Question;
