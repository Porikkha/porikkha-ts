import { Schema, model, models } from "mongoose";
import Question from "@/models/questions";


export interface ExamInterface {
  creatorId: string,
  title: string,
  description: string ,
  questions: [Object],
  startTime: Date,
  duration: Number,
  allowedAbilities: [Object],
};

const examSchema = new Schema<ExamInterface>({
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
