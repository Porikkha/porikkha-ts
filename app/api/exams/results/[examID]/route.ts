'use server';
import { getExamDetailsFromPG } from '@/controllers/examRepo';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
    const examID = params.examID;
    const examDetails = await getExamDetailsFromPG(examID);
    console.log("🚀 ~ file: route.ts:9 ~ GET ~ examDetails:", examDetails)
    return NextResponse.json(examDetails);
  }