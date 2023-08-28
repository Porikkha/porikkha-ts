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

export function autogradeQuestion(question: Question) {
  if (question.type === 'multiple-choice')
    return autogradeMultipleChoiceQuestion(question as MultipleChoiceQuestion);
  else if (question.type === 'single-choice')
    return autogradeSingleChoiceQuestion(question as SingleChoiceQuestion);
  else if (question.type === 'short-answer')
    return autogradeShortQuestion(question as ShortAnswerQuestion);
}

export const dummyQuestions: Question[] = [
  ...MultipleChoiceQuestions,
  ...ShortAnswerQuestions,
  ...SingleChoiceQuestions,
];
