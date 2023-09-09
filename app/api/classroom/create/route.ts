'use server';
import { NextRequest, NextResponse } from 'next/server';
import { generateId } from '@/utils/helper';
import { createClassroom } from '@/controllers/classroom';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  const classroom = body.classroom;
  const id = classroom.classroomID;
  if (typeof id == 'undefined' || !id) {
    classroom.classroomID = generateId(6);
  }
  if (!session?.user.id) {
    return NextResponse.error();
  }
  classroom.creatorID = session?.user.id;
  const res = await createClassroom(classroom);
  return NextResponse.json(res);
}
