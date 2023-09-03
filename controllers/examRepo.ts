import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface, { permuteQuestions, removeAnswerFromExam } from '@/interfaces/Exam';
import { prisma } from '@/utils/database';
import {
  MultipleChoiceAnswer,
  MultipleChoiceQuestion,
  ShortAnswerAnswer,
  ShortAnswerQuestion,
  SingleChoiceAnswer,
  SingleChoiceQuestion,
  removeAnswer,
} from '@/interfaces';
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
    return null;
  }
  // Attempt to create the exam in the database.
  try {
    const exam: ExamInterface | null = await Exam.findOne({ examID: examID });
    console.log('✅ Exam fetch successful from Mongo!');
    return exam;
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};
export const getExamWithoutAnswer = async (userID: string, examID: string) => {
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
    const submission = await getSubmissionFromDatabase(examID, userID);

    if (examWithAnswer === null) {
      console.log('❌❌❌ Error during exam fetch: Exam not found');
      return null;
    }

    // const exam = removeAnswerFromExam(examWithAnswer);
    const exam = permuteQuestions(examWithAnswer, userID, true);

    if (submission === null) return exam;

    return mergeSubmissionWithExam(exam, submission);
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};

export const getExamMetaByUserId = async (userID: string) => {
  const exams = await prisma.exam.findMany({
    where: {
      creatorID: userID,
    },
  });
  return exams;
};

export const deleteExamFromDB = async (examID: string) => {
  try {
    await prisma.exam.delete({
      where: {
        examID: examID,
      },
    });
    console.log('Deleted from PG');
    await connectMongoDB();
    await Exam.deleteOne({ examID: examID });
    console.log('Deleted Exam from Mongo');
    await Submission.deleteMany({ examID: examID });
    console.log('Deleted all submissions from Mongo');
  } catch (err) {
    console.log('🚀 ~ file: examRepo.ts:83 ~ deleteExamFromDB ~ err:', err);
    return { status: 500 };
  }
  return { status: 200 };
};

export const getExamDetailsFromPG = async (examID: string) => {
  try {
    const allSubmissionsForExamID = await prisma.submission.findMany({
      where: {
        examID: examID,
      },
      select:{
        achievedMarks: true,
        integrityScore: true,
        submissionTime: true,
        student:{
          select:{
            username: true,
          }
        }
      }
    });
    console.log(
      '🚀 ~ file: examRepo.ts:108 ~ getExamDetailsFromPG ~ allSubmissionsForExamID:',
      allSubmissionsForExamID
    );
    return { status: 200, rows: allSubmissionsForExamID };
  } catch (err) {
    console.log('🚀 ~ file: examRepo.ts:109 ~ getExamDetailsFromPG ~ err:', err);
  }
  return { status: 500 };
};
