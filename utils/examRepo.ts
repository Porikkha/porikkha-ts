import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface from '@/interfaces/Exam';
import { prisma } from '@/utils/database';

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
    const exam = await Exam.findOne({ examId });
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
