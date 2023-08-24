'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getExamFromDatabase } from '@/controllers/examRepo';
export async function GET(request: NextRequest, { params }: any) {
  // we will use params to access the data passed to the dynamic route
  const examID = params.examID;
  console.log('🚀 ~ file: route.ts:7 ~ GET ~ examID:', examID);
  const exam = await getExamFromDatabase(examID);
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
  return NextResponse.json({ status: 200, exam: exam });
}
