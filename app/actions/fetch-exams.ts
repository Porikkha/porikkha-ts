'use server';
import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';

export const createExam = async (creatorID: any) => {
  await connectMongoDB();
  try {
    const exams = await Exam.find({ creatorID }).exec();
    console.log('🚀 ~ found exam: fetch-exams.js:9 ~ createExam ~ exams:', exams);
    return exams;
  } catch (err) {
    console.log('🚀 ~ failed: create-exam-action.js:71 ~ createExam ~ err:', err);
  }
  return null;
};
