import { DefaultArgs } from '@prisma/client/runtime/library';
import Question, { dummyQuestions, permuteQuestion, removeAnswer } from './question/Question';
import { Prisma, Exam as ExamPrisma } from '@prisma/client';
import Random from '@/utils/random';
import stringToNumber from '@/utils/stringtonumber';


// export default interface Exam extends ExamPrisma {
//   questions: Question[];
//   allowedAbilities: Object[];
// }
export default interface Exam {
  creatorID: string;
  examID: string;
  title: string;
  description: string;
  questions: Question[];
  startTime: Date;
  duration: number;
  totalMarks: number;
  allowedAbilities: Object[];
}

export const dummyExam: Exam = {
  creatorID: '1',
  examID: '123456',
  title: 'General Knowledge',
  description: 'This is a general knowledge exam. Will help in BCS',
  questions: dummyQuestions,
  startTime: new Date(),
  duration: 60,
  totalMarks: 0,
  allowedAbilities: [],
};

export const removeAnswerFromExam = (exam: Exam, rand?: Random) => {
  let newQuestions = exam.questions.map((question, index) => {
    return (rand === undefined) ? removeAnswer(question): permuteQuestion(removeAnswer(question),rand);
  });
  exam.questions = newQuestions;
  return exam;
};

export const permuteQuestions = (exam: Exam, studentID: string, remove_answer: boolean = true): Exam => {
  let rand: Random = new Random(stringToNumber(exam.examID+studentID)) ;
  // console.log(`Seed Mapping: ${exam.examID+studentID} --- >  ${stringToNumber(exam.examID+studentID)} `);  
  // console.log("🚀 ~ file: Exam.ts:51 ~ varnewQuestions:Question[]=exam.questions.map ~ exam.questions:", exam.questions)
  
  if( remove_answer === true ) exam = removeAnswerFromExam(exam,rand) ;

  exam.questions.map((question, index) => {
    let i = rand.randrange(index,exam.questions.length-1);
    console.log(i);
    [exam.questions[i], exam.questions[index] ] = [exam.questions[index], exam.questions[i]] ;
  });

  // console.log("🚀 ~ file: Exam.ts:54 ~ permuteQuestions ~ newQuestions:", exam.questions)
  return exam; 
}

export const getExamTotalMarks = (questions:Question[]):number => {
  let totalMarks:number = 0 ;
  
  questions.map((question) => {
    totalMarks += question.points ;
  });

  return totalMarks; 
}