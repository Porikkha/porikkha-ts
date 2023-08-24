import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface, { removeAnswerFromExam } from '@/interfaces/Exam';
import { prisma } from '@/utils/database';
import { MultipleChoiceAnswer, MultipleChoiceQuestion, ShortAnswerAnswer, ShortAnswerQuestion, SingleChoiceAnswer, SingleChoiceQuestion, removeAnswer } from '@/interfaces';
import Submission from '@/models/submissions';
import { getSubmissionFromDatabase } from './submission';
import SubmissionInterface, { mergeSubmissionWithExam } from '@/interfaces/Submission';


export const getExamFromDatabase = async (examID: string) => {
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
    const exam= await Exam.findOne({ examID });
    console.log('✅ Exam fetch successful from Mongo!');
    return exam;
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};
export const getExamWithoutAnswer = async (userID:string, examID: string) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return {};
  }
  try {
    const examWithAnswer = await Exam.findOne({ examID });
    const submission:SubmissionInterface|null = await getSubmissionFromDatabase(examID,userID) ;

    if( examWithAnswer === null ) {
      console.log('❌❌❌ Error during exam fetch: Exam not found');
      return null;
    }

    const exam:ExamInterface = removeAnswerFromExam(examWithAnswer) ; 

    if( submission === null ) 
      return exam ;
    
    return mergeSubmissionWithExam(exam,submission) ; 
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};

export const getExamMetaByUserId = async (userID: string) => {
  console.log("🚀 ~ file: examRepo.ts:26 ~ getAllExamsFromDatabase ~ userID:", userID)
  const exams = await prisma.exam.findMany(
    {
      where: {
        creatorID: userID
      }
    }
  )
  console.log("🚀 ~ file: examRepo.ts:30 ~ getAllExamsFromDatabase ~ exams", exams)
  return exams;
};