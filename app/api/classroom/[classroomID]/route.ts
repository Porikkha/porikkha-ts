import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getClassroom } from '@/controllers/classroom';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const classroomID = params.classroomID;
  const res = await getClassroom(classroomID);
  return NextResponse.json(res);
}
