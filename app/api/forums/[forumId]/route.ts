'use server';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest, { params }: any) {
  const { forumId } = params;
  const body = await request.json();

  return NextResponse.redirect(`/forums/${forumId}/${title}/${content}`);
}
