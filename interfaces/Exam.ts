import Question, { dummyQuestions, removeAnswer } from './question/Question';

export default interface Exam {
  creatorID: string;
  examID: string;
  title: string;
  description: string;
  questions: Question[];
  startTime: Date;
  duration: number;
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
  allowedAbilities: [],
};
export const removeAnswerFromExam = (exam:Exam) => {
  let newQuestions = exam.questions.map((question,index) => {
     return removeAnswer(question)
  })
  return {...exam,questions:newQuestions} ; 
}