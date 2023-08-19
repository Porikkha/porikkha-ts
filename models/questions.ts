import { Schema, model, models, Model } from "mongoose";
import Question from "@/interfaces/question/Question";


// const choiceSchema = new Schema<Choice>({
//   text: { type: String, required: true },
//   id: { type: Number, required: true },
// });

const questionSchema = new Schema<Question>({
  id: 10,
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["single-choice", "multiple-choice", "short-answer"],
    required: true,
  },
  points: { type: Number, default: 1 },
});

const Question = models.Question as Model<Question> || model<Question>("Question", questionSchema);

export default Question;
