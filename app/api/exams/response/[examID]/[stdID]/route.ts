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
import { autogradeAndUpdateSubmission, createSubmissionOnDatabase, getSubmissionFromDatabase } from '@/controllers/submission';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }

  const userID = session?.user.id!; 

  const stdID = params.stdID;
  const examID = params.examID;

  await autogradeAndUpdateSubmission(examID, stdID);
  const exam = await getExamWithSubmission(stdID, examID);
  if (exam == null) {
    return NextResponse.redirect(homeUrl);
  }
  if (exam?.creatorID != userID) {
        return NextResponse.redirect(homeUrl);
  }
  console.log("🚀 ~ file: route.ts:28 ~ GET ~ exam:", exam);
  const submission = await getSubmissionFromDatabase(examID, stdID);
  return NextResponse.json({ status: 200, exam: exam, submission: submission });
}

export async function POST(request: NextRequest,{params} : any ) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }
  const userID = session?.user.id!; 
  const body = await request.json();



  const exam = await getExamWithSubmission(body.submission.stdID, body.submission.examID);
  if (exam == null) {
    return NextResponse.redirect(homeUrl);
  }
    if (exam?.creatorID != userID) {
        return NextResponse.redirect(homeUrl);
    }
    const res = await createSubmissionOnDatabase(body.submission);
  return NextResponse.json(res);
}