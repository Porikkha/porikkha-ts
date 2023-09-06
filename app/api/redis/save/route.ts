import { exampleSubmission } from '@/interfaces/Submission';
import { saveSubmission } from '@/utils/redis';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';



export async function GET() {
  saveSubmission(exampleSubmission);
  return NextResponse.json({ message: 'Submission saved' });
}

