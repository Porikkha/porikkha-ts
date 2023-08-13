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
			{ text: "Mumbai",  id: 2},
			{ text: "Kolkata",  id: 3},
			{ text: "Chennai",  id: 4},
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,],
	},
	{
		id: 2, 
		title: "Who is the president of North Korea?",
		choices: [
			{ text: "Moon Jae-in",  id: 1},
			{ text: "Park Geun-hye",  id: 2},
			{ text: "Lee Myung-bak",  id: 3},
			{ text: "Roh Moo-hyun",  id: 4},
			{ text: "Kim Jong-un",  id: 5},
		],
		type: "multiple-choice",
		points: 5,
		answerId: [5,],
	},
];