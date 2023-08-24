'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSubmissionOnDatabase,
  getSubmissionFromDatabase,
} from '@/controllers/submission';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const examID = body.submission.examID;
  console.log('🆔 ~ file: route.ts:11 ~ POST ~ examID/submissionID:', examID);
  const res = await createSubmissionOnDatabase(body.submission);
  return NextResponse.json(res);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { examID, userID } = body;
  console.log('🆔 ~ file: route.ts:11 ~ PUT ~ examID/submissionID:', examID, userID);
  const res = await getSubmissionFromDatabase(examID, userID);
  console.log('🚀 ~ file: route.ts:18 ~ PUT ~ res:', res);

  return NextResponse.json(res);
}
