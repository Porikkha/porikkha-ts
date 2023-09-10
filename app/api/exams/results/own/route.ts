'use server';
import { getParticipatedExamPG, hasExamEnded } from '@/controllers/examRepo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const userID = session?.user.id!;
  const data = await getParticipatedExamPG(userID);

  let modifiedData = [];
  for (let i = 0; i < data.rows!.length; i++) {
    let submission = data.rows![i];
    let examID = submission.examID;
    if (await hasExamEnded(examID)) {
      modifiedData.push(submission);
    }
  }
  data.rows = modifiedData;
  return NextResponse.json(data);
}
