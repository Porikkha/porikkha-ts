'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getExamMetaByUserId } from '@/controllers/examRepo';

// export async function GET(request: NextRequest) {
//   const body = await request.json();
//   if (body.exam.examId == '') {
//     const examId = generateId();
//     console.log('🆔 ~ file: route.ts:11 ~ POST ~ examId:', examId);
//     body.exam.examId = examId;
//   }
//   const res = await createExamOnDatabase(body.exam);
//   return NextResponse.json(res);
// }

// export async function GET(request: NextRequest, { params }: any) {
//   // we will use params to access the data passed to the dynamic route
//   const examId = params.examId;
//   console.log('🚀 ~ file: route.ts:7 ~ GET ~ examId:', examId);
//   const exam = await getExamFromDatabase(examId);
//   console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
//   return NextResponse.json({ status: 200, exam: exam });
// }

export async function GET(request: NextRequest, {params} : any) {
    const userId = params.userId;
    console.log("🚀 ~ file: route.ts:28 ~ GET ~ userId:", userId)
    const exams = await getExamMetaByUserId(userId);
    return NextResponse.json({status: 200, exams: exams});
}