// extend Question
import Question from "./Question";
import Choice from "./Choice"

export default interface SingleChoiceQuestion extends Question {
    choices: Choice[];
    answerId: number | undefined;
}


export const dummyQuestions:SingleChoiceQuestion[] = [
	{
		id: 1, 
		title: "What is the capital of India?",
		choices: [
			{ text: "New Delhi",  id: 1},
		],
		type: "single-choice",
		points: 5,
		answerId: 1,
	},
	{
		id: 2, 
		title: "What is the capital of India?",
		choices: [
			{ text: "New Delhi",  id: 1},
			{text: "Dhaka", id: 2},
			{text:"Jalalabad",id:3}
		],
		type: "single-choice",
		points: 5,
		answerId: 1,
	},
];