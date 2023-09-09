import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { inviteUserToClassroom } from '@/controllers/classroom';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { status: 401, message: 'Unauthorized access not allowed', type: 'error' };
  }
  const body = await request.json();
  body.fromUserEmail = session?.user.email!;
  const response = await inviteUserToClassroom(body);
  return NextResponse.json(response);
}
