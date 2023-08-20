
export default interface Submission {
    examId: string,
    userId: string,
    answers: Answer[],
    submissionTime: Date,
    score: number,
}

export interface Answer {
    questionId: number,
    type: "single-choice" | "multiple-choice" | "short-answer";
}

export interface MultipleChoiceAnswer extends Answer {
    answer: number[],
}

export interface SingleChoiceAnswer extends Answer {
    answer: number,
}

export interface ShortAnswerAnswer extends Answer {
    answer: string,
}