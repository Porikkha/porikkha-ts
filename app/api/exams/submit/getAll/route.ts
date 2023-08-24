'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createSubmissionOnDatabase, getAllSubmissionsFromDatabase, getSubmissionFromDatabase } from '@/controllers/submission';
import { getServerSession } from 'next-auth';

export async function GET(){
  const session = await getServerSession() ;
  console.log('🆔 ~ file: route.ts:11 ~ GET ~ /exam/submit/getAll:');
  const submissions = await getAllSubmissionsFromDatabase(session?.user.email!);
  return NextResponse.json({submissions:submissions});
}