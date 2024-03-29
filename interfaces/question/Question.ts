import Random from '@/utils/random';
import MultipleChoiceQuestion, {
  dummyQuestions as MultipleChoiceQuestions,
  permuteMultipleChoiceQuestion,
  removeMultipleChoiceQuestionAnswer,
} from './MultipleChoiceQuestion';
import ShortAnswerQuestion, {
  dummyQuestions as ShortAnswerQuestions,
  permuteShortQuestion,
  removeShortQuestionAnswer,
} from './ShortAnswerQuestion';
import {
  dummyQuestions as SingleChoiceQuestions,
  permuteSingleChoiceQuestion,
  removeSingleChoiceQuestionAnswer,
} from './SingleChoiceQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';

export default interface Question {
  id: number;
  title: string;
  type: 'single-choice' | 'multiple-choice' | 'short-answer';
  points: number;
}

export function questionMethods(question: Question) {
  if (question.type === 'multiple-choice')
    return { removeAnswer: removeMultipleChoiceQuestionAnswer, permuteQuestion: permuteMultipleChoiceQuestion };
  else if (question.type === 'single-choice')
    return { removeAnswer: removeSingleChoiceQuestionAnswer, permuteQuestion: permuteSingleChoiceQuestion };
  else if (question.type === 'short-answer')
    return { removeAnswer: removeShortQuestionAnswer, permuteQuestion: permuteShortQuestion };
}

export function removeAnswer(question: Question) {
  if (question.type === 'multiple-choice')
    return removeMultipleChoiceQuestionAnswer(question as MultipleChoiceQuestion);
  else if (question.type === 'single-choice')
    return removeSingleChoiceQuestionAnswer(question as SingleChoiceQuestion);
  else if (question.type === 'short-answer')
    return removeShortQuestionAnswer(question as ShortAnswerQuestion);
  return question;
}
export function permuteQuestion(question: Question, rand:Random) {
  if (question.type === 'multiple-choice')
    return permuteMultipleChoiceQuestion(question as MultipleChoiceQuestion,rand);
  else if (question.type === 'single-choice')
    return permuteSingleChoiceQuestion(question as SingleChoiceQuestion,rand);
  else if (question.type === 'short-answer')
    return permuteShortQuestion(question as ShortAnswerQuestion,rand);
  
  return question;
}

export const dummyQuestions: Question[] = [
  ...MultipleChoiceQuestions,
  ...ShortAnswerQuestions,
  ...SingleChoiceQuestions,
];
