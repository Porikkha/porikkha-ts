'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createExamOnDatabase } from '@/controllers/examCreation';
import { generateId } from '@/controllers/examCreation';
import { deleteExamFromDB } from '@/controllers/examRepo';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('🚀 ~ file: route.ts:8 ~ POST ~ body:', body);
  if (
    body.exam.examID === undefined ||
    body.exam.examID === null ||
    body.exam.examID === ''
  ) {
    const examID = generateId();
    console.log('🆔 ~ file: route.ts:11 ~ POST ~ examID:', examID);
    body.exam.examID = examID;
    console.log('🚀 ~ file: route.ts:13 ~ POST ~ body.exam:', body.exam);
  }
  const userJetaDise = new Date(body.exam.startTime);
  console.log("🚀 ~ file: route.ts:21 ~ POST ~ userJetaDise:", userJetaDise);
  const ekhonSomoy = new Date();
  console.log("🚀 ~ file: route.ts:23 ~ POST ~ ekhonSomoy:", ekhonSomoy);
  if (userJetaDise < ekhonSomoy){
    console.log("Selected a time earlier than the current one, please try again.");
    return NextResponse.json({status: 1000})
  }

  const res = await createExamOnDatabase(body.exam);
  return NextResponse.json(res);
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  console.log('At exams/route.js DELETE: ', body);
  const res = deleteExamFromDB(body.examID);
  return NextResponse.json(res);
}
