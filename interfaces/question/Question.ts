import MultipleChoiceQuestion, { dummyQuestions as MultipleChoiceQuestions, removeMultipleChoiceQuestionAnswer } from './MultipleChoiceQuestion';
import ShortAnswerQuestion, { dummyQuestions as ShortAnswerQuestions, removeShortQuestionAnswer } from './ShortAnswerQuestion';
import { dummyQuestions as SingleChoiceQuestions, removeSingleChoiceQuestionAnswer } from './SingleChoiceQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';


export default interface Question {
  id: number;
  title: string;
  type: 'single-choice' | 'multiple-choice' | 'short-answer';
  points: number;
}

export function removeAnswer(question:Question) { 
  if( question.type === 'multiple-choice')
    return removeMultipleChoiceQuestionAnswer(question as MultipleChoiceQuestion);
  else if( question.type === 'single-choice')
    return removeSingleChoiceQuestionAnswer(question as SingleChoiceQuestion);
  else if (question.type === 'short-answer')
    return removeShortQuestionAnswer(question as ShortAnswerQuestion) ;
  return question ;
}
export const dummyQuestions: Question[] = [ 
  ...MultipleChoiceQuestions,
  ...ShortAnswerQuestions,
  ...SingleChoiceQuestions,
];
