import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getClassroom } from '@/controllers/classroom';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const classroomID = params.classroomID;
  const res = await getClassroom(classroomID);
  return NextResponse.json(res);
}
