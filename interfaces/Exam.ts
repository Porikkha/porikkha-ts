import { dummyQuestions } from "./question/MultipleChoiceQuestion";

export default interface Exam{
  creatorId: string,
  title: string,
  description: string ,
  questions: Object[],
  startTime: Date,
  duration: Number,
  allowedAbilities: Object[],
};

export const dummyExam:Exam = {
  creatorId: "1",
  title: "General Knowledge",
  description: "This is a general knowledge exam. Will help in BCS",
  questions: dummyQuestions,
  startTime: new Date(),
  duration: 60,
  allowedAbilities: [],
};
