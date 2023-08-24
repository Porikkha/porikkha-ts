'use server';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSubmissionOnDatabase,
  getAllSubmissionsFromDatabase,
  getSubmissionFromDatabase,
} from '@/controllers/submission';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('🆔 ~ file: route.ts:11 ~ GET ~ /exam/submit/getAll:');
  const submissions = await getAllSubmissionsFromDatabase(session?.user.id!);
  return NextResponse.json({ submissions: submissions });
}
