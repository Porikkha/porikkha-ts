"use client";

import { useEffect, useState } from "react";
import {
    createExam,
    createExamFromQuestions,
} from "@/app/actions/create-exam-action";
import { useSession } from "next-auth/react";
import AddIcon from "@mui/icons-material/Add";
import AddQuestionModal from "@/components/questions/AddQuestionModal";
import EditExamDetailsModal from "@/components/questions/EditExamDetailsModal";
import ExamBanner from "@/components/questions/ExamBanner";
import SuccessAlert from "@/components/ui/SuccessAlert";
import Question from "@/interfaces/question/Question";
import ExamInterface from "@/interfaces/Exam";


import MultipleChoiceQuestion, { dummyQuestions as dummyMCQs } from "@/interfaces/question/MultipleChoiceQuestion";
import { dummyQuestions as dummyShorts } from "@/interfaces/question/ShortAnswerQuestion";
import { dummyQuestions as dummySCQs } from "@/interfaces/question/SingleChoiceQuestion";

const dummyQuestions = (dummyMCQs as Question[]).concat(dummySCQs).concat(dummyShorts)

import Exam from "@/interfaces/Exam";
import EditQuestionModal from "@/components/questions/EditQuestionModal";


const Home = () => {
    const setQuestionNumbers = (questions: Question[]) => {
        return questions.map((question, index) => {
            question.id = index + 1;
            return question;
        });
    };

    
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
    const [quess, setQuess] = useState<Question[]>(setQuestionNumbers(dummyQuestions));
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

    

    const deleteQuestion = (index: number) => {
        let newQuestions = [...quess];
        newQuestions.splice(index, 1);
        newQuestions = setQuestionNumbers(newQuestions);
        setQuess(newQuestions);
    };

    const moveQuestionUp = (index: number) => {
        if (index === 0) return;
        let newQuestions = [...quess];
        const temp = newQuestions[index];
        newQuestions[index] = newQuestions[index - 1];
        newQuestions[index - 1] = temp;
        newQuestions = setQuestionNumbers(newQuestions);
        setQuess(newQuestions);
    };

    const moveQuestionDown = (index: number) => {
        if (index === quess.length - 1) return;
        let newQuestions = [...quess];
        const temp = newQuestions[index];
        newQuestions[index] = newQuestions[index + 1];
        newQuestions[index + 1] = temp;
        newQuestions = setQuestionNumbers(newQuestions);
        setQuess(newQuestions);
    };

    const getEditActions = (index: number) => {
        const editActions = {
            deleteQuestion: () => deleteQuestion(index),
            moveQuestionUp: () => moveQuestionUp(index),
            moveQuestionDown: () => moveQuestionDown(index),
        };
        return editActions;
    };

    const handleExamSubmit = async (event: any) => {
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
        // createExamFromQuestions(quess, session?.user?.email);
        const creatorId = session?.user?.id;
        if (!creatorId) {
            console.log("❌ ~ file: page.tsx:202 : creatorId not found");
            return;
        }
        const exam: ExamInterface = {
            creatorId: session?.user?.id!,
            examId: "123456",
            title: "Exam Title",
            description: "Exam Description",
            questions: quess,
            startTime: new Date(),
            duration: 30,
            allowedAbilities: [
                {
                  type: 'copy',
                  isAllowed: false,
                },
                {
                  type: 'print',
                  isAllowed: true,
                },
              ],
        };
        const response = await fetch('/api/exams', {
            method: 'POST',
            body: JSON.stringify({
                exam: exam,
            })
        });
        const data = await response.json();
        setShowSuccessAlert(data.status==200);
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
                            {/* <EditQuestion
                                qdata={question}
                                addQuestion={(question:Question) => {
                                    let newQuestions = [...quess] ;
                                    newQuestions[index] = question ;
                                    setQuess(newQuestions);
                                }}
                                editActions={getEditActions(index)}
                            /> */}
                            <EditQuestionModal
                                key={`${index}${question.type}}`}
                                qdata={question}
                                setQuestion={(question:Question) => {
                                    let newQuestions = [...quess] ;
                                    newQuestions[index] = question ;
                                    setQuess(newQuestions);
                                }}
                                editActions={getEditActions(index)}
                            />
                        </div>
                    );
                })}
                <button
                    // onClick={() => setAddQuestionOpen(true)}
                    onClick={() => {
                        const newQuestion:MultipleChoiceQuestion ={
                            id: 0,
                            title:"Set your title",
                            type:"multiple-choice",
                            points:5,
                            choices: [],
                            answerId: [],
                        }
                        setQuess(setQuestionNumbers([...quess,newQuestion]));
                    }}
                    className="bg-purple-500 text-white font-semibold py-2 px-2 border hover:border-primary rounded float-left my-5"
                >
                    <AddIcon className="p-1" />
                    <div className="float-right mr-2">Question</div>
                </button>

                {/* <AddQuestionModal
                    open={addQuestionOpen}
                    setOpen={setAddQuestionOpen}
                    addQuestion={(data: Question) => {
                        setQuess([...quess, data]);
                        setAddQuestionOpen(false);
                    }}
                /> */}

                <form
                    className="float-right py-5"
                    onSubmit={handleExamSubmit}
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
