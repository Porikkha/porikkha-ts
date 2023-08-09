import { Schema, model, models } from "mongoose";
import Question from "@/models/questions";
const examSchema = Schema({
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  questions: [Object],
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  allowedAbilities: [Object],
});

const Exam = models.Exam || model("Exam", examSchema);

export default Exam;
