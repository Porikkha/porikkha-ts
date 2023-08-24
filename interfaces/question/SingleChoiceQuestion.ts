// extend Question
import Question from './Question';
import Choice from './Choice';
import { SingleChoiceAnswer } from './Answer';

export default interface SingleChoiceQuestion extends Question, SingleChoiceAnswer {
  choices: Choice[];
}

export function removeSingleChoiceQuestionAnswer(question: SingleChoiceQuestion) {
  return { ...question, answer: 0 };
}

export const dummyQuestions: SingleChoiceQuestion[] = [
  {
    id: 1,
    title: 'What is the capital of India?',
    choices: [{ text: 'New Delhi', id: 1 }],
    type: 'single-choice',
    points: 5,
    answer: 1,
  },
  {
    id: 2,
    title: 'What is the capital of India?',
    choices: [
      { text: 'New Delhi', id: 1 },
      { text: 'Dhaka', id: 2 },
      { text: 'Jalalabad', id: 3 },
    ],
    type: 'single-choice',
    points: 5,
    answer: 1,
  },
];
