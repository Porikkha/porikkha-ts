import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getClassroom, getUsers, removeUserFromClassroom } from '@/controllers/classroom';

export async function GET(request: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect('/');
  }
  const classroomID = params.classroomID;
  const userID = session?.user.id!;
  const res = await getClassroom(classroomID, userID);
  return NextResponse.json(  res  );
}

export async function POST(request:NextRequest, {params}: any){
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(request.nextUrl.origin);
  }
  const classroomID = params.classroomID;
  const userID = session?.user.id!;
  const res = await removeUserFromClassroom(classroomID, userID);
  return NextResponse.json(res);

}