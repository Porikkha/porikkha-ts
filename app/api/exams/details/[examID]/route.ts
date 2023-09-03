'use server';
import { getExamDetailsFromPG } from '@/controllers/examRepo';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
    const examID = params.examID;
    const examDetails = getExamDetailsFromPG(examID);
    return NextResponse.json({ status: 200, rows: examDetails });
  }