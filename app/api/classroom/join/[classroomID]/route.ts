import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { addUserToClassroom } from '@/controllers/classroom';

export async function POST(
  request: NextRequest,
  { params }: { params: { classroomID: string } }
) {
    const classroomID = params.classroomID;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.redirect('/');
    }
    const userID = session?.user?.id;
    const res = addUserToClassroom(classroomID, userID);
    return NextResponse.json(res);
}
