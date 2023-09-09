export interface Answer {
  questionId?: number;
  score?: number;
  type: 'single-choice' | 'multiple-choice' | 'short-answer';
}

export interface MultipleChoiceAnswer extends Answer {
  answer: number[];
  ref?: number[];
}

export interface SingleChoiceAnswer extends Answer {
  answer: number;
  ref?: number;
}

export interface ShortAnswerAnswer extends Answer {
  answer: string;
}

export const exampleMultipleChoiceAnswer: MultipleChoiceAnswer = {
  questionId: 1,
  type: 'multiple-choice',
  answer: [1, 2],
}

export const exampleSingleChoiceAnswer: SingleChoiceAnswer = {
  questionId: 2,
  type: 'single-choice',
  answer: 1,
}

export const exampleShortAnswerAnswer: ShortAnswerAnswer = {
  questionId: 3,
  type: 'short-answer',
  answer: 'This is a short answer',
}

export function autogradeMultipleChoice(answer1 : MultipleChoiceAnswer, answer2: MultipleChoiceAnswer) {
  const dict = new Map();
  answer1.answer.map((num,i)=>{
    dict.set(num,1);
  });
  answer2.answer.map((num,i)=>{
    dict.delete(num); 
  });
  return dict.size === 0;
}

export function autogradeSingleChoice(answer1: SingleChoiceAnswer, answer2: SingleChoiceAnswer) {
  return answer1.answer === answer2.answer ;
}

export function autogradeShort(answer1: ShortAnswerAnswer, answer2: ShortAnswerAnswer) {
  return false; 
}

export function autogradeAnswer(answer1: Answer, answer2: Answer) {
  if( answer1.type !== answer2.type )
    throw new Error("The types of answers don't match!!") ;

  if (answer1.type === 'multiple-choice')
    return autogradeMultipleChoice(answer1 as MultipleChoiceAnswer,answer2 as MultipleChoiceAnswer);
  else if (answer1.type === 'single-choice')
    return autogradeSingleChoice(answer1 as SingleChoiceAnswer,answer2 as SingleChoiceAnswer);
  else if (answer1.type === 'short-answer')
    return autogradeShort(answer1 as ShortAnswerAnswer,answer2 as ShortAnswerAnswer);
}

