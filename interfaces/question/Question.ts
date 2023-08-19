
import { dummyQuestions as MultipleChoiceQuestions } from "./MultipleChoiceQuestion";
import { dummyQuestions as ShortAnswerQuestions } from "./ShortAnswerQuestion";
import { dummyQuestions as SingleChoiceQuestion } from "./SingleChoiceQuestion";

export default interface Question {
  id: number; 
  title: string;
  type: "single-choice" | "multiple-choice" | "short-answer";
  points: number;
};

export const dummyQuestions: Question[] = [
  ...MultipleChoiceQuestions,
  ...ShortAnswerQuestions,
  ...SingleChoiceQuestion,
]