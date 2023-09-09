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
import { autogradeAndUpdateSubmission } from '@/controllers/submission';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }

  const userID = session?.user.id!; 

  const stdID = params.stdID;
  const examID = params.examID;

  const examEnded = await hasExamEnded(examID);
  const canJoinResponse = await canJoinExam(examID);
  console.log(canJoinResponse.message);
  if (examEnded.status === 404 || examEnded.status === 500) {
    return NextResponse.redirect(homeUrl);
  } 
  await autogradeAndUpdateSubmission(examID, stdID);
  const exam = await getExamWithSubmission(stdID, examID);
  if (exam == null) {
    return NextResponse.redirect(homeUrl);
  }
  if (exam?.creatorID != userID) {
        return NextResponse.redirect(homeUrl);
  }
  console.log("🚀 ~ file: route.ts:28 ~ GET ~ exam:", exam);
  return NextResponse.json({ status: 200, exam: exam });
}
