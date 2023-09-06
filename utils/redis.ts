import Submission from '@/interfaces/Submission';
import { kv } from '@vercel/kv';

export async function saveSubmission(submission : Submission) {
    await kv.set(submission.studentID + ":" + submission.examID, JSON.stringify(submission));
}

export async function getSubmission(studentID : string, examID : string) {
    const submission = await kv.get(studentID + ":" + examID);
    return submission;
}