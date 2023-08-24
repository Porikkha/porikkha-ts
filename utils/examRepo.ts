import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface, { removeAnswerFromExam } from '@/interfaces/Exam';
import { prisma } from '@/utils/database';
import { removeAnswer } from '@/interfaces';


export const getExamFromDatabase = async (examId: string) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return {};
  }
  // Attempt to create the exam in the database.
  try {
    const exam= await Exam.findOne({ examId });
    console.log('✅ Exam fetch successful from Mongo!');
    return exam;
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};
export const getExamWithoutAnswer = async (examId: string) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return {};
  }
  // Attempt to create the exam in the database.
  try {
    const examWithAnswer = await Exam.findOne({ examId });
    // clean answers from questions 
    const exam = removeAnswerFromExam(examWithAnswer) ; 
    console.log('✅ Exam fetch successful from Mongo!');
    return exam;
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};

export const getExamMetaByUserId = async (userId: string) => {
  console.log("🚀 ~ file: examRepo.ts:26 ~ getAllExamsFromDatabase ~ userId:", userId)
  const exams = await prisma.exam.findMany(
    {
      where: {
        creatorId: userId
      }
    }
  )
  console.log("🚀 ~ file: examRepo.ts:30 ~ getAllExamsFromDatabase ~ exams", exams)
  return exams;
};


const mergeSubmissioonToExam = async () => {
  console.log("🚀 ~ file: page.tsx:56 ~ fetchSubmissioon ~ data:", data)

  const ques = (data.submission as Submission).answers.map((answer, index) => {
    let q = questions[index];
    if (q.type === "multiple-choice")
      (q as MultipleChoiceQuestion).answer = (answer as MultipleChoiceAnswer).answer;
    else if (q.type === "single-choice")
      (q as SingleChoiceQuestion).answer = (answer as SingleChoiceAnswer).answer;
    else if (q.type === "short-answer")
      (q as ShortAnswerQuestion).answer = (answer as ShortAnswerAnswer).answer;
    return q;
  });
  if (data.status == 200 && data.submission) {
    const submission = data.submission;
  };

};