import Question from "./Question";

export default interface ShortAnswerQuestion extends Question {
    type:"short-answer";
    referenceAnswer: string;
}


export const dummyQuestions:ShortAnswerQuestion[] = [
    {
		id: 1, 
		title: "What's the full form of CS",
        type:"short-answer",
		points: 5,
		referenceAnswer: "Computer Science",
	},
	{
		id: 2, 
		title: "Capital of Indonesia?",
        type:"short-answer",
		points: 5,
		referenceAnswer: "Jakarta",
	},
]