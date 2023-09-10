import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getClassroom } from '@/controllers/classroom';
import { createDiscussionThread, getDiscussionThreadsByClassroomID } from '@/controllers/discussionThread';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const classroomID = params.classroomID;
  const userID = session?.user.id!;
  const res = await getDiscussionThreadsByClassroomID(classroomID);
  
  return NextResponse.json(res);
}


export async function POST(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const classroomID = params.classroomID;
  const userID = session?.user.id!;
  const body = await request.json();
  console.log("🚀 ~ file: route.ts:27 ~ POST ~ body:", body)
  const res = await createDiscussionThread(body.thread); 
  return NextResponse.json(res);
}
