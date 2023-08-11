import { Schema, model, models, Document, Model } from "mongoose";
import { Choice } from "@/interfaces/Question";
import  Question  from "@/interfaces/Question";


const choiceSchema = new Schema<Choice>({
  text: { type: String, required: true },
  id: { type: Number, required: true },
});

const questionSchema = new Schema<Question>({
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

const Question = models.Question as Model<Question> || model<Question>("Question", questionSchema);

export default Question;
