'use server';
import { NextRequest, NextResponse } from 'next/server';
import ExamInterface from '@/interfaces/Exam';
import { createExamOnDatabase } from '@/utils/examCreation';
import { generateId } from '@/utils/examCreation';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const examId = body.examId ? body.examId : generateId();
  console.log('🚀 ~ file: route.ts:11 ~ POST ~ examId:', examId);

  // Define the exam object.
  const exam: ExamInterface = {
    creatorId: body.sessionId,
    examId: examId,
    title: 'Exam 1',
    description: 'This is an exam',
    questions: body.questions,
    startTime: new Date(),
    duration: 60,
    allowedAbilities: [
      {
        type: 'copy',
        isAllowed: false,
      },
      {
        type: 'print',
        isAllowed: true,
      },
    ],
  };
  const res = await createExamOnDatabase(exam);
  return NextResponse.json(res);
}
