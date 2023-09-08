import { createSubmissionOnDatabase } from '@/controllers/submission';
import Submission from '@/interfaces/Submission';
import { kv } from '@vercel/kv';

export async function saveSubmission(submission : Submission) {
    await kv.sadd("submissions", submission.studentID + ":" + submission.examID );
    await kv.set(submission.studentID + ":" + submission.examID, JSON.stringify(submission));
}

export async function getSubmission(studentID : string, examID : string) {
    const submission = await kv.get(studentID + ":" + examID);
    return submission;
}

export async function saveAllSubmissionstoDB() {
    const keys = await kv.smembers("submissions");
    for (const key of keys) {
        const submission: any = await kv.get(key);
        await createSubmissionOnDatabase(submission);
    }
    kv.flushdb();
}