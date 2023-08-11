"use client";

import MultipleChoice from "@/components/questions/MultipleChoice";
import { useEffect, useState } from "react";
import { createExam, createExamFromQuestions } from "@/app/actions/create-exam-action";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import AddQuestionModal from "@/components/questions/AddQuestionModal";
import EditExamDetailsModal from "@/components/questions/EditExamDetailsModal";
import ExamBanner from "@/components/questions/ExamBanner";
import SuccessAlert from "@/components/ui/SuccessAlert";
import Question from "@/interfaces/Question";
import { dummyQuestions} from "@/interfaces/Question";
import Exam from "@/interfaces/Exam";


const Home = () => {
	const [open, setOpen] = useState(false);
	const [addQuestionOpen, setAddQuestionOpen] = useState(false);

	const [examName, setExamName] = useState("Exam Name");
	const [examDesc, setExamDesc] = useState("Exam Description");
	const [startTime, setStartTime] = useState("2023-08-23T18:35");
	const [startTimeFormatted, setStartTimeFormatted] = useState(
		"30 January 2022 , 10:00PM"
	);
	const [examDuration, setExamDuration] = useState("30:00");

	const [shuffleQuestions, setShuffleQuestions] = useState(false);
	const [allowKeyboardShortcuts, setAllowKeyboardShortcuts] = useState(false);
	const [enableAutoGrading, setEnableAutoGrading] = useState(false);

	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [quess, setQuess] = useState(dummyQuestions);
	const { data: session } = useSession();

	const setters = {
		setExamName,
		setExamDesc,
		setStartTime,
		setStartTimeFormatted,
		setExamDuration,
		setOpen,
		setShuffleQuestions,
		setAllowKeyboardShortcuts,
		setEnableAutoGrading,
	};

	const values = {
		examName,
		examDesc,
		startTime,
		startTimeFormatted,
		examDuration,
		shuffleQuestions,
		allowKeyboardShortcuts,
		enableAutoGrading,
	};

  const setQuestionNumbers = (questions:Question[]) => {
    return questions.map((question, index) => {
      question.id = index + 1;
      return question;
    });
  }

  const deleteQuestion = (index:number) => {
    let newQuestions = [...quess];
    newQuestions.splice(index, 1);
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };

  const moveQuestionUp = (index:number) => {
    if (index === 0) return;
    let newQuestions = [...quess];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };

  const moveQuestionDown = (index:number) => {
    if (index === quess.length - 1) return;
    let newQuestions = [...quess];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };
  

  const getEditActions = (index:number) => {
    const editActions = {
      deleteQuestion: () => deleteQuestion(index),
      moveQuestionUp: () => moveQuestionUp(index),
      moveQuestionDown: () => moveQuestionDown(index),
    };
    return editActions;
  };




	return (
		<section className="w-full">
			<ExamBanner values={values} setters={setters} />
			<EditExamDetailsModal
				open={open}
				setOpen={setOpen}
				values={values}
				setters={setters}
			/>
			<SuccessAlert
				showSuccessAlert={showSuccessAlert}
				setShowSuccessAlert={setShowSuccessAlert}
			/>

			<div className="w-4/5 mx-auto">
				{quess.map((question, index) => {
					return (
						<div className="py-2" key={index}>
							<MultipleChoice qdata={question} editActions={getEditActions(index)} />
						</div>
					);
				})}
				<button
					onClick={() => setAddQuestionOpen(true)}
					className="bg-purple-500 text-white font-semibold py-2 px-2 border hover:border-primary rounded float-left my-5"
				>
					<AddIcon className="p-1" />
					<div className="float-right mr-2">Question</div>
				</button>

				<AddQuestionModal
					open={addQuestionOpen}
					setOpen={setAddQuestionOpen}
					addQuestion={(data:Question) => {
						setQuess([...quess, data]);
            			setAddQuestionOpen(false);
					}}
				/>

				<form
					className="float-right py-5"
					onSubmit={(event) => {
						event.preventDefault();
						// const exam:Exam = {
						// 	name: examName,
						// 	description: examDesc,
						// 	startTime: startTime,
						// 	duration: examDuration,
						// 	questions: quess,
						// 	allowKeyboardShortcuts: allowKeyboardShortcuts,
						// 	enableAutoGrading: enableAutoGrading,
						// 	shuffleQuestions: shuffleQuestions,
						// };
						createExamFromQuestions(quess, session?.user?.email );
						setShowSuccessAlert(true);
					}}
				>
					<button
						type="submit"
						className="bg-purple-700/70 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500"
					>
						Save{" "}
					</button>
				</form>
			</div>
		</section>
	);
};

export default Home;