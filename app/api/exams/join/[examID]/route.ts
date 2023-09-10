'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  getExamFromDatabase,
  getExamWithoutAnswer,
  canJoinExam,
} from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }
  const userID = session?.user.id!;
  const examID = params.examID;

  const canJoinResponse = await canJoinExam(examID);
  console.log(canJoinResponse.message);
  if (canJoinResponse.status === 404 || canJoinResponse.status === 500) {
    return NextResponse.redirect(homeUrl);
  } else if (canJoinResponse.status === 403) {
    return NextResponse.redirect(homeUrl + '/exam/preview/' + examID);
  }
  const data = await getExamWithoutAnswer(userID, examID);
  if (data === null) {
    return NextResponse.redirect(homeUrl);
  }
  console.log('🚀 ~ file: route.ts:28 ~ GET ~ data:', data);
  return NextResponse.json({
    status: 200,
    exam: data?.exam,
    integrityScore: data?.integrityScore,
  });
}
