'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import {
  createSubmissionOnDatabase,
  getSubmissionFromDatabase,
  checkSubmissionDeadline,
  autogradeAndUpdateSubmission,
} from '@/controllers/submission';
import { getSubmission, saveAllSubmissionstoDB, saveSubmission } from '@/utils/redis';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      type: 'error',
      message: 'Unauthorized submission not allowed',
    });
  }
  const body = await request.json();
  const deadline = await checkSubmissionDeadline(body.submission.examID);
  if (deadline.status !== 200) {
    return NextResponse.json(deadline);
  }
  body.submission.studentID = session?.user.id!;

  // await saveSubmission(body.submission);
  // const redisSubmission: any = await getSubmission(body.submission.studentID, body.submission.examID);
  // console.log('🚀 ~ file: route.ts:11 ~ POST ~ redisSubmission:', redisSubmission);
  // const allSubs = await getAllSubmissions();
  // console.log(allSubs);
  // saveAllSubmissionstoDB();

  console.log(" ----------------------------------------------------------------- ");
  console.log("🚀 ~ file: route.ts:38 ~ POST ~ body.submission:", body.submission)
  

  const res = await createSubmissionOnDatabase(body.submission);
  await autogradeAndUpdateSubmission(body.submission.examID, body.submission.studentID);
  return NextResponse.json(res);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { examID, userID } = body;
  console.log('🆔 ~ file: route.ts:11 ~ PUT ~ examID/submissionID:', examID, userID);
  const res = await getSubmissionFromDatabase(examID, userID);
  console.log('🚀 ~ file: route.ts:18 ~ PUT ~ res:', res);

  return NextResponse.json(res);
}
