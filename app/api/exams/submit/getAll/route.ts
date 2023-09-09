'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSubmissionOnDatabase,
  getAllSubmissionsFromDatabase,
  getSubmissionFromDatabase,
} from '@/controllers/submission';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { hasExamEnded } from '@/controllers/examRepo';
import Submission from '@/interfaces/Submission';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('🆔 ~ file: route.ts:11 ~ GET ~ /exam/submit/getAll:');
  let submissions = await getAllSubmissionsFromDatabase(session?.user.id!);
  if (submissions === null) {
    submissions = [];
  }
  console.log('🚀 ~ file: route.ts:17 ~ GET ~ submissions:', submissions);
  let modifiedSubmissions: any = [];
  for (let submission of submissions!) {
    const hasEnded = await hasExamEnded(submission.examID);
    console.log('🚀 ~ file: route.ts:21 ~ submissions?.forEach ~ hasEnded:', hasEnded);
    if (!hasEnded) submission.achievedMarks = -1;
    modifiedSubmissions.push(submission);
  }
  console.log(modifiedSubmissions);
  return NextResponse.json({ submissions: modifiedSubmissions });
}
