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
  // Attempt to create the exam in the database.
  try {
    const filter = { examId: submission.examId };

    await Submission.findOneAndUpdate(filter, submission, { upsert: true });
    console.log('✅ Submission creation successful on Mongo!');
    const prismaSubmission = {
        examId: submission.examId,
        userId: submission.userId,
        submissionTime: submission.submissionTime,
        score: submission.score,
        answers: {
            create: submission.answers
        }
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
  return { status: 200, submissionId: submission.examId };
};

const getSubmissionFromDatabase = async (examId: string, userId: string) => {
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:9 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:11 ~ POST ~ Error connecting to mongoDB:', err);
    return {};
  }
  // Attempt to create the exam in the database.
  try {
    const submission = await Submission.findOne({examId: examId, userId: userId});
    console.log('✅ Submission fetch successful from Mongo!');
    return submission;
  } catch (err: any) {
    throw new Error('🚀 Error during submission fetch:', err);
  }
};

export { getSubmissionFromDatabase,createSubmissionOnDatabase};
