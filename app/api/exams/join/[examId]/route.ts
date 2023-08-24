'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getExamFromDatabase, getExamWithoutAnswer } from '@/utils/examRepo';
export async function GET(request: NextRequest, { params }: any) {
  // we will use params to access the data passed to the dynamic route
  const examId = params.examId;
  console.log('🚀 ~ file: route.ts:7 ~ GET ~ examId:', examId);
  const exam = await getExamWithoutAnswer(examId);
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
  return NextResponse.json({ status: 200, exam: exam });
}
