'use server';
import { addExamToClassroom } from '@/controllers/classroom';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
export async function POST(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const userID = session?.user?.id;
  const body = await request.json();
  body.userID = userID;
  const res = await addExamToClassroom(body);
  console.log('Response from addExamToClassroom: ', res);
  return NextResponse.json(res);
}
