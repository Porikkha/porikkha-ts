
export default interface Submission {
    examId: string,
    userId: string,
    answers: Answer[],
    submissionTime: Date,
    score: Number,
}

export interface Answer {
    questionId: Number,
    type: "single-choice" | "multiple-choice" | "short-answer";
}

export interface MultipleChoiceAnswer extends Answer {
    answer: Number[],
}

export interface SingleChoiceAnswer extends Answer {
    answer: Number,
}

export interface ShortAnswerAnswer extends Answer {
    answer: String,
}