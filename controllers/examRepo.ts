import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface, {
  ExamResponse,
  permuteQuestions,
  removeAnswerFromExam,
} from '@/interfaces/Exam';
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
import SubmissionInterface, {
  mergeSubmissionWithExam,
  mergeSubmissionWithExamRef,
} from '@/interfaces/Submission';

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

export const hasExamEnded = async (examID: string) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
      select: {
        startTime: true,
        duration: true,
      },
    });
    if (exam === null) {
      return { status: 404, message: `Exam ${examID} not found`, type: 'error' };
    }
    const startTime = new Date(exam.startTime);
    const endTime = new Date(startTime.getTime() + exam.duration * 60000);
    const result = (await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP`) as unknown as {
      current_timestamp: string;
    }[];
    const now = new Date(result[0].current_timestamp).getTime();
    if (now < endTime.getTime()) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
  return false;
}

export const canJoinExam = async (examID: string) => {
  try {
    const exam = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
      select: {
        startTime: true,
        duration: true,
      },
    });
    if (exam === null) {
      return { status: 404, message: `Exam ${examID} not found`, type: 'error' };
    }
    const startTime = new Date(exam.startTime);
    const endTime = new Date(startTime.getTime() + exam.duration * 60000);
    const result = (await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP`) as unknown as {
      current_timestamp: string;
    }[];
    const now = new Date(result[0].current_timestamp).getTime();
    if (now < startTime.getTime() || now > endTime.getTime()) {
      return { status: 403, message: 'Exam not started or already ended', type: 'info' };
    }
    return { status: 200 };
  } catch (err) {
    console.log('Error invoking canJoinExam', err);
  }
  return { status: 500, message: 'Error invoking canJoinExam', type: 'error' };
};
export const getExamWithoutAnswer = async (
  userID: string,
  examID: string
): Promise<ExamResponse | null> => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return null;
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
    console.log('🚀 ~ file: examRepo.ts:83 ~ getExamWithoutAnswer ~ exam:', exam);

    if (submission === null) return { exam: exam, integrityScore: 100 };

    return { exam: mergeSubmissionWithExam(exam, submission), integrityScore: submission.integrityScore! };
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};

export const getExamWithSubmission = async (
  userID: string,
  examID: string
): Promise<ExamInterface | null> => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return null;
  }
  try {
    const examWithAnswer = await Exam.findOne({ examID });
    const submission = await getSubmissionFromDatabase(examID, userID);

    console.log(
      '🚀 ~ file: examRepo.ts:138 ~ getExamWithSubmission ~ answers:',
      submission?.answers
    );

    if (examWithAnswer === null) {
      console.log('❌❌❌ Error during exam fetch: Exam not found');
      return null;
    }

    // const exam = removeAnswerFromExam(examWithAnswer);
    const exam = permuteQuestions(examWithAnswer, userID, false);
    console.log('🚀 ~ file: examRepo.ts:83 ~ getExamWithoutAnswer ~ exam:', exam);

    if (submission === null) return exam;

    return mergeSubmissionWithExamRef(exam, submission);
  } catch (err: any) {
    throw new Error('🚀 Error during exam fetch:', err);
  }
};

export const getExamMetaByUserId = async (userID: string) => {
  const exams = await prisma.exam.findMany({
    where: {
      creatorID: userID,
    },
    include: {
      _count: {
        select: {
          Submission: true,
        }
      }
    }

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
    const examMeta = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
      select: {
        title: true,
      },
    });
    if (examMeta === null) {
      return { status: 404, message: `Invalid exam id: ${examID}`, type: 'error' };
    }

    const allSubmissionsForExamID = await prisma.submission.findMany({
      where: {
        examID: examID,
      },
      select: {
        achievedMarks: true,
        integrityScore: true,
        submissionTime: true,
        totalAnswered: true,
        totalCorrect: true,
        student: {
          select: {
            username: true,
            userID: true,
          },
        },
        exam: {
          select: {
            totalMarks: true,
            examID: true,
          },
        },
      },
    });
    console.log(
      '🚀 ~ file: examRepo.ts:108 ~ getExamDetailsFromPG ~ allSubmissionsForExamID:',
      allSubmissionsForExamID
    );
    return {
      status: 200,
      rows: allSubmissionsForExamID,
      examTitle: examMeta.title,
    };
  } catch (err) {
    console.log('🚀 ~ file: examRepo.ts:109 ~ getExamDetailsFromPG ~ err:', err);
  }
  return { status: 500, message: 'Error invoking getExamDetailsFromPG', type: 'error' };
};

// Needed for exam preview data, returns only the exam metadata
export const getExamFromPG = async (examID: string) => {
  try {
    const examMetadata = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
    });
    if (examMetadata === null) {
      return { status: 404, message: `Invalid exam id: ${examID}`, type: 'error' };
    }
    return { status: 200, exam: examMetadata };
  } catch (err) {
    console.log('Server: Error invoking getExamFromPG', err);
  }
  return {
    status: 500,
    message: 'Error invoking getExamFromPG',
    type: 'error',
  };
};

export const getParticipatedExamPG = async (userID: string) => {
  try {
    const submissions = await prisma.submission.findMany({
      where: {
        studentID: userID,
      },
      include: {
        exam: true,
        student: {
          select: {
            userID: true,
          },
        },
      },
    });
    return { status: 200, rows: submissions };
  } catch (err) {
    console.log('Error invoking getParticipatedExamPG', err);
  }
  return { status: 500, message: 'Error invoking getParticipatedExamPG', type: 'error' };
};
