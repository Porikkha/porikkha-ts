import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface from '@/interfaces/Exam';
import { prisma } from '@/utils/database';
const createExamOnDatabase = async (exam: ExamInterface) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return { status: 500 };
  }
  // Attempt to create the exam in the database.
  try {
    await Exam.create(exam);
    console.log('✅ Exam creation successful on Mongo!');
    const prismaExam = {
      id: exam.examId,
      creatorId: exam.creatorId,
      title: exam.title,
      description: exam.description,
      startTime: exam.startTime,
      duration: exam.duration,
    };
    const createdExam = await prisma.exam.create({
      data: prismaExam,
    });
    console.log("🚀 ~ file: examCreation.ts:29 ~ createExamOnDatabase ~ createdExam:", createdExam)
    console.log('✅ Exam creation successful on Prisma!');
  } catch (err) {
    console.error('🚀 Error during exam creation:', err);
    return { status: 500 };
  }
  return { status: 200, examId: exam.examId };
};

const generateId = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export { createExamOnDatabase, generateId };
