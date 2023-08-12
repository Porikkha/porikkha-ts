import Question from "./Question";
import Choice from "./Choice"

export default interface MultipleChoiceQuestion extends Question {
    choices: Choice[];
    answerId: number[];
}


export const dummyQuestions:MultipleChoiceQuestion[] = [
	{
		id: 1, 
		title: "What is the capital of India?",
		choices: [
			{ text: "New Delhi",  id: 1},
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,],
	},
	{
		id: 2, 
		title: "What is the capital of India?",
		choices: [
			{ text: "New Delhi",  id: 1},
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,],
	},
];