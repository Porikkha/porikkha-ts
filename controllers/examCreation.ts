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
    if( new Date(exam.startTime) < new Date() ){
      console.log("🚀 ~ file: examCreation.ts:17 ~ createExamOnDatabase ~ Date:", new Date()); 
      console.log("🚀 ~ file: examCreation.ts:17 ~ createExamOnDatabase ~ startTime:", exam.startTime);
      console.error('🚀 Error during exam creation: past time inserted.');
      throw new Error('Past time inserted.');
    }
    
    const filter = { examID: exam.examID };
    await Exam.findOneAndUpdate(filter, exam, { upsert: true });
    console.log('✅ Exam creation successful on Mongo!');
    const prismaExam = {
      examID: exam.examID,
      creatorID: exam.creatorID,
      title: exam.title,
      description: exam.description,
      startTime: exam.startTime,
      duration: exam.duration,
      totalMarks: exam.totalMarks
    };
    console.log("🚀 ~ file: examCreation.ts:34 ~ createExamOnDatabase ~ prismaExam.startTime:", prismaExam.startTime)
    console.log("🚀 ~ file: examCreation.ts:34 ~ createExamOnDatabase ~ prismaExam.startTime:", prismaExam.startTime)
    const createdExam = await prisma.exam.upsert({
      where: {
        examID: exam.examID,
      },
      update: prismaExam,
      create: prismaExam,
    });
    console.log(
      '🚀 ~ file: examCreation.ts:29 ~ createExamOnDatabase ~ createdExam:',
      createdExam
    );
    console.log('✅ Exam creation successful on Prisma!');
  } catch (err) {
    console.error('🚀 Error during exam creation:', err);
    return { status: 500, error:err };
  }
  return { status: 200, examID: exam.examID };
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
