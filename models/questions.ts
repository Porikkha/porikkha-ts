// import { Schema, model, models } from "mongoose";

// const choiceSchema = Schema({
//   text: { type: String, required: true },
//   id: { type: Number, required: true },
// });

// const questionSchema = Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   choices: [choiceSchema],
//   type: {
//     type: String,
//     enum: ["single-choice", "multiple-choice", "short-answer"],
//     required: true,
//   },
//   points: { type: Number, default: 1 },
//   answerId: [Number],
// });

// const Question = models.Question || model("Question", questionSchema);

// export default Question;

import { Schema, model, models, Document, Model } from "mongoose";

interface Choice {
  text: string;
  id: number;
}

interface Question extends Document {
  title: string;
  description?: string;
  choices: Choice[];
  type: "single-choice" | "multiple-choice" | "short-answer";
  points: number;
  answerId: number[];
}

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
