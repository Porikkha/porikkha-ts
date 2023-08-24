import { Answer } from "./question/Answer";

export default interface Submission {
    examId: string,
    userId: string,
    answers: Answer[],
    submissionTime: Date,
    score: number,
}

