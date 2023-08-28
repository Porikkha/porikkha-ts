import { connectMongoDB } from '@/utils/database';
import SubmissionInterface from '@/interfaces/Submission';
import { prisma } from '@/utils/database';
import Submission from '@/models/submissions';

const createSubmissionOnDatabase = async (submission: SubmissionInterface) => {
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return { status: 500 };
  }
  try {
    const filter = { examID: submission.examID, userID: submission.studentID };

    await Submission.findOneAndUpdate(filter, submission, { upsert: true });
    console.log('✅ Submission creation successful on Mongo!');
    const prismaSubmission = {
      examID: submission.examID,
      studentID: submission.studentID,
      integrityScore: submission?.integrityScore,
      achievedMarks: submission?.achievedMarks,
    };
    // const createdSubmission = await prisma.submission.upsert({
    //   where: {
    //     id: exam.examId,
    //   },
    //   update: prismaExam,
    //   create: prismaExam,
    // });
    // console.log(
    //   '🚀 ~ file: examCreation.ts:29 ~ createExamOnDatabase ~ createdExam:',
    //   createdExam
    // );
    // console.log('✅ Submission creation successful on Prisma!');
  } catch (err) {
    console.error('🚀 Error during exam creation:', err);
    return { status: 500 };
  }
  return { status: 200, submissionId: submission.examID };
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
    console.log("🚀 ~ file: submission.ts:64 ~ getSubmissionFromDatabase ~ submission:", submission)
    return submission;
  } catch (err: any) {
    throw new Error('🚀 Error during submission fetch:', err);
    return null;
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
    const submissions = await Submission.find({ studentID:userID });
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
