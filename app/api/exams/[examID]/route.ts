'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getExamFromDatabase } from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const homeUrl = request.nextUrl.origin;
  if (!session?.user) {
    return NextResponse.redirect(homeUrl);
  }
  // we will use params to access the data passed to the dynamic route
  const examID = params.examID;
  console.log('🚀 ~ file: route.ts:7 ~ GET ~ examID:', examID);
  const exam = await getExamFromDatabase(examID);
  if (exam === null) {
    return NextResponse.json({ status: 404, exam: null });
  }
  if (exam.creatorID !== session?.user.id) {
    return NextResponse.redirect(homeUrl + '/exam/preview/' + examID);
  }
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
  return NextResponse.json({ status: 200, exam: exam });
}
