import {
  Exam,
  MultipleChoiceQuestion,
  ShortAnswerQuestion,
  SingleChoiceQuestion,
} from '.';
import {
  Answer,
  MultipleChoiceAnswer,
  ShortAnswerAnswer,
  SingleChoiceAnswer,
} from './question/Answer';
import {Submission as SubmissionPrisma} from "@prisma/client" ;

export default interface Submission extends SubmissionPrisma {
  answers: Answer[]; 
}

export function mergeSubmissionWithExam(exam: Exam, submission: Submission) {
  const ques = submission.answers.map((answer, index) => {
    let q = exam.questions[index];
    if (q.type === 'multiple-choice')
      (q as MultipleChoiceQuestion).answer = (answer as MultipleChoiceAnswer).answer;
    else if (q.type === 'single-choice')
      (q as SingleChoiceQuestion).answer = (answer as SingleChoiceAnswer).answer;
    else if (q.type === 'short-answer')
      (q as ShortAnswerQuestion).answer = (answer as ShortAnswerAnswer).answer;
    return q;
  });
  exam.questions = ques;
  return exam;
}
