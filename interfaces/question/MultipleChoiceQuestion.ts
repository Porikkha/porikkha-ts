import Question from './Question';
import Choice, { permuteChoices } from './Choice';
import { MultipleChoiceAnswer } from './Answer';
import Random from '@/utils/random';

export default interface MultipleChoiceQuestion extends Question, MultipleChoiceAnswer {
  choices: Choice[];
}

export function removeMultipleChoiceQuestionAnswer(question: MultipleChoiceQuestion) {
  return { ...question, answer: [] };
}
export function permuteMultipleChoiceQuestion(question: MultipleChoiceQuestion, rand: Random) {
  let choices: Choice[] = permuteChoices(question.choices,rand) ;
  question.choices = choices ;
  return question; 
}

export const dummyQuestions: MultipleChoiceQuestion[] = [
  {
    id: 1,
    title: 'What are the good names?',
    choices: [
      { text: 'New Delhi', id: 1 },
      { text: 'Jakarta', id: 2 },
      { text: 'Jackson Heights', id: 3 },
      { text: 'Birmingham', id: 4 },
    ],
    type: 'multiple-choice',
    points: 5,
    answer: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: 'What are the full forms of FCFS, LCLF',
    choices: [
      { text: 'First Come First Serve', id: 1 },
      { text: 'Last Come Last Serve', id: 2 },
      { text: "I don't know ", id: 3 },
    ],
    type: 'multiple-choice',
    points: 5,
    answer: [1, 2],
  },
];
