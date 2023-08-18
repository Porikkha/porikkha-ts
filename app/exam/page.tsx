"use client";
import SingleChoiceQuestion from "@/interfaces/question/SingleChoiceQuestion";
import Question from "@/components/questions/Question";
import type QuestionInterface from "@/interfaces/question/Question";
import { useState } from "react";

import { dummyExam } from "@/interfaces/Exam";
import ExamViewBanner from "@/components/exam/ExamViewBanner";

export default function Page() {
	let qq = dummyExam.questions;
	qq = qq.map((question, index) => {
		if (question.type === "short-answer")
			return { ...question, referenceAnswer: "" };
		else if (question.type === "multiple-choice")
			return { ...question, answerId: [] };
		else if (question.type === "single-choice")
			return { ...question, answerId: undefined } as SingleChoiceQuestion;
		return question;
	});

	const [questions, setQuestions] = useState<QuestionInterface[]>(qq);
	console.log(questions);
	return (
		<section className="w-full">
			<ExamViewBanner exam={dummyExam} />
			<div className="w-4/5 mx-auto">
				{questions.map((question, index) => {
					return (
						<Question
							qdata={question}
							setQuestion={(ques: QuestionInterface) => {
								const newquestions = [...questions];
								newquestions[index] = ques;
								console.log(newquestions);
								setQuestions(newquestions);
							}}
							key={index}
						/>
					);
				})}
			</div>
			<div className="w-4/5 mx-auto">
				<form
					className="float-right py-5"
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<button
						type="submit"
						className="bg-purple-700/70 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						Submit{" "}
					</button>
				</form>
			</div>
		</section>
	);
}
