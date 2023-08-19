'use server';
import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/utils/database';
import Exam from '@/models/exams';
import ExamInterface from '@/interfaces/Exam';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Define the exam object.
  const exam: ExamInterface = {
    creatorId: body.sessionId,
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
  // Connect to mongoDB
  try {
    await connectMongoDB();
    console.log('✅ ~ file: route.ts:35 ~ POST ~ Connected to mongoDB');
  } catch (err) {
    console.log('🚀 ~ file: route.ts:35 ~ POST ~ Error connecting to mongoDB:', err);
    return NextResponse.json({ status: 500 });
  }
  // Attempt to create the exam in the database.
  try {
    await Exam.create(exam);
    console.log('✅ Exam creation successful!');
  } catch (err) {
    console.error('🚀 Error during exam creation:', err);
    return NextResponse.json({ status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
