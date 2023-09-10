'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getExamMetaByUserId } from '@/controllers/examRepo';

// export async function GET(request: NextRequest) {
//   const body = await request.json();
//   if (body.exam.examID == '') {
//     const examID = generateId();
//     console.log('🆔 ~ file: route.ts:11 ~ POST ~ examID:', examID);
//     body.exam.examID = examID;
//   }
//   const res = await createExamOnDatabase(body.exam);
//   return NextResponse.json(res);
// }

// export async function GET(request: NextRequest, { params }: any) {
//   // we will use params to access the data passed to the dynamic route
//   const examID = params.examID;
//   console.log('🚀 ~ file: route.ts:7 ~ GET ~ examID:', examID);
//   const exam = await getExamFromDatabase(examID);
//   console.log('🚀 ~ file: route.ts:9 ~ GET ~ exam:', exam);
//   return NextResponse.json({ status: 200, exam: exam });
// }

export async function GET(request: NextRequest, { params }: any) {
  const userID = params.userID;
  const exams = await getExamMetaByUserId(userID);
  console.log('---------------------------------');
  console.log(exams);
  return NextResponse.json({ status: 200, exams: exams });
}
