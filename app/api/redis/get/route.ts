import { exampleSubmission } from '@/interfaces/Submission';
import { getSubmission } from '@/utils/redis';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
 
export async function GET() {
  const submission = await getSubmission(exampleSubmission.studentID, exampleSubmission.examID);
  return NextResponse.json(submission);
}

