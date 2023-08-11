import { Document } from "mongoose";

export interface Choice {
  text: string;
  id: number;
};

export default interface Question { //extends Document {
  id: number; 
  title: string;
  description?: string;
  choices: Choice[];
  type: "single-choice" | "multiple-choice" | "short-answer";
  points: number;
  answerId: number[];
};

export const dummyQuestions:Question[] = [
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