'use server';
import { NextRequest, NextResponse } from 'next/server';
import ExamInterface from '@/interfaces/Exam';
import { createExamOnDatabase } from '@/utils/examCreation';
import { generateId } from '@/utils/examCreation';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.exam.examId=="") {
    const examId = generateId();
    body.exam.examId = examId;
  }
  const res = await createExamOnDatabase(body.exam);
  return NextResponse.json(res);
}
