
export default interface Submission {
    examId: string,
    userId: string,
    answers: Answer[],
    submissionTime: Date,
    score: Number,
}

interface Answer {
    questionId: Number,
    type: "single-choice" | "multiple-choice" | "short-answer";
}

interface MultipleChoiceAnswer extends Answer {
    answer: Number[],
}

interface SingleChoiceAnswer extends Answer {
    answer: Number,
}

interface ShortAnswerAnswer extends Answer {
    answer: String,
}