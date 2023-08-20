"use server"

import { getSubmissionFromDatabase } from "@/utils/submissionCreation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, {params}:any) {
  const body = await request.json();
  console.log(params);
  console.log(`🆔 ~ file: route.ts:11 ~ GET ~ userId/examId:${params.userId}/${params.examId}`);
  return NextResponse.json({res: 'res'});
}