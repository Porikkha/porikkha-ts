'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  getExamFromDatabase,
  getExamWithoutAnswer,
  canJoinExam,
  hasExamEnded,
  getExamWithSubmission,
} from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  autogradeAndUpdateSubmission,
  createSubmissionOnDatabase,
  getSubmissionFromDatabase,
} from '@/controllers/submission';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }
  const userID = session?.user.id!;
  const body = await request.json();

  console.log('------------- HIT --------------');
  console.log(body);

  const exam = await getExamWithSubmission(body.stdID, body.examID);
  if (exam == null) {
    return NextResponse.redirect(homeUrl);
  }
  if (exam?.creatorID != userID) {
    return NextResponse.redirect(homeUrl);
  }
  const res = await createSubmissionOnDatabase(body);
  return NextResponse.json(res);
}
