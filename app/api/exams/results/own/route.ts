'use server';
import { getParticipatedExamPG } from '@/controllers/examRepo';
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
  return NextResponse.json(data);
}
