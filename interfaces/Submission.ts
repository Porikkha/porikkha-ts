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

export default interface Submission {
    studentID: string;
    examID: string;
    integrityScore?: number;
    achievedMarks?: number;
  answers: Answer[]; 
}


export function mergeSubmissionWithExam(exam: Exam, submission: Submission) {
  var indexQuestion : number[] = new Array<number>(exam.questions.length+2) ; 
  
  exam.questions.map((question,index) => {
    indexQuestion[question.id] = index; 
  }); 

  const ques = submission.answers.map((answer, index) => {
    let q = exam.questions[indexQuestion[answer.questionId!]];
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
