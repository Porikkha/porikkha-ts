import { NextRequest, NextResponse } from 'next/server';
import { getExamFromPG } from '@/controllers/examRepo';

export async function GET(request: NextRequest, { params }: any) {
  const res = await getExamFromPG(params.examID);
  return NextResponse.json(res);
}
