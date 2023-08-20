'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionOnDatabase } from '@/utils/submissionCreation';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const examId = body.submission.examId; 
  console.log('🆔 ~ file: route.ts:11 ~ POST ~ examId/submissionId:', examId);
  const res = await createSubmissionOnDatabase(body.submission);
  return NextResponse.json(res);
}
