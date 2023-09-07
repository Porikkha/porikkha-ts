import { connectMongoDB } from '@/utils/database';
import SubmissionInterface, { autogradeSubmission } from '@/interfaces/Submission';
import { prisma } from '@/utils/database';
import Submission from '@/models/submissions';
import { getExamFromDatabase } from './examRepo';

export const checkSubmissionDeadline = async (examID: string) => {
  try {
    const examTimeData = await prisma.exam.findUnique({
      where: {
        examID: examID,
      },
      select: {
        startTime: true,
        duration: true,
      },
    });
    if (examTimeData === null) {
      return { status: 404, type: 'error', message: 'Invalid examID' };
    }
    const result = (await prisma.$queryRaw`SELECT CURRENT_TIMESTAMP`) as unknown as {
      current_timestamp: string;
    }[];
    const currentTime = new Date(result[0].current_timestamp);

    const examStartTime = new Date(examTimeData.startTime);
    const duration = examTimeData.duration;
    const examEndTime = new Date(examStartTime.getTime() + duration * 60000);
    console.log('Exam end time:', examEndTime);
    console.log('Current time:', currentTime);
    if (currentTime > examEndTime) {
      return { status: 403, type: 'warning', message: 'Submission deadline has passed' };
    }
    if (currentTime < examStartTime) {
      return { status: 403, type: 'info', message: 'Exam has not started yet' };
    }
    return { status: 200 };
  } catch (err) {
    return { status: 500, type: 'error', message: 'Error checking submission deadline' };
  }
};

const createSubmissionOnDatabase = async (submission: SubmissionInterface) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return { status: 500, type: 'error', message: 'Error connecting to mongoDB' };
  }
  try {
    const filter = { examID: submission.examID, studentID: submission.studentID };

    await Submission.findOneAndUpdate(filter, submission, { upsert: true });
    console.log('✅ Submission creation successful on Mongo!');
    const prismaSubmission = {
      examID: submission.examID,
      studentID: submission.studentID,
      integrityScore: submission?.integrityScore,
      achievedMarks: submission?.achievedMarks,
    };
    const createdSubmission = await prisma.submission.upsert({
      where: {
        student_exam_composite_id: {
          examID: submission.examID,
          studentID: submission.studentID,
        },
      },
      update: prismaSubmission,
      create: prismaSubmission,
    });
    console.log('✅ Submission creation successful on Prisma!');
  } catch (err) {
    console.error('🚀 Error when creating submission on prisma:', err);
    return {
      status: 500,
      type: 'error',
      message: 'Error when creating submission on prisma',
    };
  }
  return { status: 200, type: 'success', message: 'Submission saved successfully!' };
};

const getSubmissionFromDatabase = async (examID: string, userID: string) => {
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return null;
  }
  // Attempt to create the exam in the database.
  try {
    const submission: SubmissionInterface | null = await Submission.findOne({
      examID: examID,
      studentID: userID,
    });
    console.log('✅ Submission fetch successful from Mongo!');
    console.log(
      '🚀 ~ file: submission.ts:64 ~ getSubmissionFromDatabase ~ submission:',
      submission
    );
    return submission;
  } catch (err: any) {
    throw new Error('🚀 Error during submission fetch:', err);
    return null;
  }
};

const autogradeAndUpdateSubmission = async (examID: string, studentID: string) => {
  const submission = await getSubmissionFromDatabase(examID, studentID);
  const exam = await getExamFromDatabase(examID);

  if (submission !== null && exam !== null) {
    let newSubmission = autogradeSubmission(exam, submission);
    await createSubmissionOnDatabase(newSubmission);
    console.log('Autograding successful!');
  }
};

const getAllSubmissionsFromDatabase = async (userID: string) => {
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return null;
  }
  try {
    const submissions = await Submission.find({ studentID: userID });
    console.log('✅ Submissions fetch successful from Mongo!');
    return submissions;
  } catch (err: any) {
    throw new Error('🚀 Error during submission fetch:', err);
    return null;
  }
};

export {
  getSubmissionFromDatabase,
  createSubmissionOnDatabase,
  getAllSubmissionsFromDatabase,
};
