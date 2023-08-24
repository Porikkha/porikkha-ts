import { ShortAnswerAnswer } from './Answer';
import Question from './Question';

export default interface ShortAnswerQuestion extends Question,ShortAnswerAnswer {
}

export function removeShortQuestionAnswer (question: ShortAnswerQuestion) {
  return {...question,answer:""} ;
}
export const dummyQuestions: ShortAnswerQuestion[] = [
  {
    id: 1,
    title: "What's the full form of CS",
    type: 'short-answer',
    points: 5,
    answer: 'Computer Science',
  },
  {
    id: 2,
    title: 'Capital of Indonesia?',
    type: 'short-answer',
    points: 5,
    answer: 'Jakarta',
  },
];
