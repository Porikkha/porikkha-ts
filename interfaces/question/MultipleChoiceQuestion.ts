import Question from "./Question";
import Choice from "./Choice"

export default interface MultipleChoiceQuestion extends Question {
    choices: Choice[];
    answerId: number[];
}


export const dummyQuestions:MultipleChoiceQuestion[] = [
	{
		id: 1, 
		title: "What are the good names?",
		choices: [
			{ text: "New Delhi",  id: 1},
			{ text: "Jakarta",  id: 2},
			{ text: "Jackson Heights",  id: 3},
			{ text: "Birmingham",  id: 4},
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,2,3,4],
	},
	{
		id: 2, 
		title: "What are the full forms of FCFS, LCLF",
		choices: [
			{ text: "First Come First Serve",  id: 1},
			{text: "Last Come Last Serve", id: 2},
			{text: "I don't know ",id:3}
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,2],
	},
];