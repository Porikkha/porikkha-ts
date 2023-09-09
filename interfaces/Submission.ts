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
  autogradeAnswer,
  exampleMultipleChoiceAnswer,
  exampleShortAnswerAnswer,
  exampleSingleChoiceAnswer,
} from './question/Answer';
import {Submission as SubmissionPrisma} from "@prisma/client" ;

export default interface Submission {
    studentID: string;
    examID: string;
    integrityScore?: number;
    achievedMarks?: number;
    graded?: boolean;
    answers: Answer[]; 
}

export const exampleSubmission: Submission = {
  studentID: '123456789',
  examID: '123456789',
  integrityScore: 0,
  achievedMarks: 0,
  answers: [
    exampleMultipleChoiceAnswer, 
    exampleSingleChoiceAnswer,
    exampleShortAnswerAnswer,
  ],
};

export function mergeSubmissionWithExam(exam: Exam, submission: Submission) {
  var indexQuestion : number[] = new Array<number>(exam.questions.length+2) ; 
  
  exam.questions.map((question,index) => {
    indexQuestion[(question as Answer).questionId!] = index; 
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

export function mergeSubmissionWithExamRef(exam: Exam, submission: Submission) {
  var indexQuestion : number[] = new Array<number>(exam.questions.length+2) ; 
    

  exam.questions.map((question,index) => {
    indexQuestion[(question as Answer).questionId!] = index; 
  }); 

  const ques = submission.answers.map((answer, index) => {
    let q = exam.questions[indexQuestion[answer.questionId!]];
    if (q.type === 'multiple-choice'){
      console.log("Actual Answer : " , (q as MultipleChoiceQuestion).answer);
      (q as MultipleChoiceQuestion).ref= (q as MultipleChoiceQuestion).answer;
      // (q as MultipleChoiceQuestion).answer = (answer as MultipleChoiceAnswer).answer;
      console.log("Submitted Answer : " , (q as MultipleChoiceQuestion).answer);
    }
    else if (q.type === 'single-choice'){
      (q as SingleChoiceQuestion).ref = (q as SingleChoiceQuestion).answer;
      // (q as SingleChoiceQuestion).answer = (answer as SingleChoiceAnswer).answer;
    }
    else if (q.type === 'short-answer')
      (q as ShortAnswerQuestion).answer = (answer as ShortAnswerAnswer).answer;
    return q;
  });
  exam.questions = ques;
  return exam;
}

export function autogradeSubmission(exam: Exam, submission: Submission) {
  let newSubmission ;
  var indexQuestion : number[] = new Array<number>(exam.questions.length+2) ; 
  
  exam.questions.map((question,index) => {
    indexQuestion[question.id] = index; 
  });
  submission.achievedMarks = 0 ;
  submission.answers.map((answer,index) => {
    const ques = exam.questions[indexQuestion[answer.questionId!]];
    const evaluation = autogradeAnswer(answer, ques as Answer ) ;
    if( evaluation === true){
        answer.score = ques.points ;
        submission.achievedMarks! += ques.points ;
    }
    else if (ques.type !== "short-answer")
      answer.score = 0 ;
  })

  return submission ;
}