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
<<<<<<< HEAD
			{ text: "Mumbai",  id: 2},
			{ text: "Kolkata",  id: 3},
			{ text: "Chennai",  id: 4},
=======
			{ text: "Jakarta",  id: 2},
			{ text: "Jackson Heights",  id: 3},
			{ text: "Birmingham",  id: 4},
>>>>>>> master
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,2,3,4],
	},
	{
		id: 2, 
<<<<<<< HEAD
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
=======
		title: "What are the full forms of FCFS, LCLF",
		choices: [
			{ text: "First Come First Serve",  id: 1},
			{text: "Last Come Last Serve", id: 2},
			{text: "I don't know ",id:3}
		],
		type: "multiple-choice",
		points: 5,
		answerId: [1,2],
>>>>>>> master
	},
];