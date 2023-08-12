// extend Question
import Question from "./Question";
import Choice from "./Choice"

export default interface SingleChoiceQuestion extends Question {
    choices: Choice[];
    answerId: number;
}