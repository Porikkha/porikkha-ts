'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createExamOnDatabase } from '@/controllers/examCreation';
import { generateId } from '@/controllers/examCreation';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.exam.examId == '') {
    const examId = generateId();
    console.log('🆔 ~ file: route.ts:11 ~ POST ~ examId:', examId);
    body.exam.examId = examId;
  }
  const res = await createExamOnDatabase(body.exam);
  return NextResponse.json(res);
}
