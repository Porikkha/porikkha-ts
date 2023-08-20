'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionOnDatabase, getSubmissionFromDatabase } from '@/utils/submissionCreation';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const examId = body.submission.examId; 
  console.log('🆔 ~ file: route.ts:11 ~ POST ~ examId/submissionId:', examId);
  const res = await createSubmissionOnDatabase(body.submission);
  return NextResponse.json(res);
};

export async function PUT(request: NextRequest){
  const body = await request.json();
  const {examId,userId} = body; 
  console.log('🆔 ~ file: route.ts:11 ~ PUT ~ examId/submissionId:', examId, userId);
  const res = await getSubmissionFromDatabase(examId,userId);
  console.log("🚀 ~ file: route.ts:18 ~ PUT ~ res:", res)
  
  return NextResponse.json(res);
}