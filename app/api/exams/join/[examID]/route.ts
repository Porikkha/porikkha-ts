'use server';
import { NextRequest, NextResponse } from 'next/server';
import { getExamFromDatabase, getExamWithoutAnswer } from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ file: route.ts:8 ~ GET ~ session:', session);
  const userID = session?.user.id!;
  const examID = params.examID;

  const exam = await getExamWithoutAnswer(userID, examID);
  console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
  return NextResponse.json({ status: 200, exam: exam });
}
