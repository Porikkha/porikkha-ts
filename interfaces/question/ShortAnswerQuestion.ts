import Question from "./Question";

export default interface ShortAnswerQuestion extends Question {
    referenceAnswer: string;
}