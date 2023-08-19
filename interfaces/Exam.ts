import Question, { dummyQuestions } from "./question/Question";

export default interface Exam{
  creatorId: string,
  examId: String,
  title: string,
  description: string ,
  questions: Question[],
  startTime: Date,
  duration: Number,
  allowedAbilities: Object[],
};

export const dummyExam:Exam = {
  creatorId: "1",
  examId: "123456",
  title: "General Knowledge",
  description: "This is a general knowledge exam. Will help in BCS",
  questions: dummyQuestions,
  startTime: new Date(),
  duration: 60,
  allowedAbilities: [],
};
