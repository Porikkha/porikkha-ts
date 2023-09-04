'use server';
import { checkIfExamExists, addExamToClassroom } from '@/controllers/classroom';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, { params }: any) {
  const examID = params.examID;
  const check = await checkIfExamExists(examID);
  if (check.status === 200) {
    // Add exam to classroom
    const res = await addExamToClassroom(examID, params.classroomID);
    return NextResponse.json(res);
  } else {
    console.log("😭 Could not add exam to classroom: Exam doesn't exist");
    return NextResponse.json(check);
  }
}
