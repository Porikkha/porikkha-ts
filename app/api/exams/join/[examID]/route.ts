'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getExamFromDatabase, getExamWithoutAnswer } from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
export async function GET(request: NextRequest, { params }: any) {
  // we will use params to access the data passed to the dynamic route
  const session = await getServerSession(); 
  console.log("/api/exams/join/")
  const userID = session?.user.id! ;
  // console.log(session) ;
  const examID = params.examID;
  console.log('🚀 ~ file: route.ts:7 ~ GET ~ examID:', examID);
  const exam = await getExamWithoutAnswer(userID,examID);
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
  return NextResponse.json({ status: 200, exam: exam });
}
