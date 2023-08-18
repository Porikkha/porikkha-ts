"use client";
<<<<<<< HEAD

import MultipleChoice from "@/components/questions/MultipleChoice";
"use client"

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
import { dummyExam } from "@/interfaces/Exam";
import ExamViewBanner from "@/components/exam/ExamViewBanner";

const ExamPage = () => {
    console.log(dummyExam);
    return (
        <section className="w-full">
            <ExamViewBanner exam={dummyExam} />
        </section>
    );
};

export default ExamPage;
=======
import { Card, CardContent } from "@mui/material";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import EditMultipleChoice from "@/components/questions/EditQuestionOld"
import SingleChoiceQuestion, { dummyQuestions } from "@/interfaces/question/SingleChoiceQuestion";
import Question from "@/components/questions/Question";
import type QuestionInterface from "@/interfaces/question/Question" 
import MultipleChoice from "@/components/questions/EditQuestion";
import { useState } from "react";

import { dummyQuestions as dummyMCQs } from "@/interfaces/question/MultipleChoiceQuestion";
import { dummyQuestions as dummyShorts } from "@/interfaces/question/ShortAnswerQuestion";

export default function Page() {
  let qq:QuestionInterface[] = (dummyQuestions as QuestionInterface[]).concat(dummyMCQs).concat(dummyShorts);
  qq = qq.map((question,index) => {
    if(question.type === "short-answer")
      return {...question,referenceAnswer:""};
    else if( question.type=== "multiple-choice")
      return {...question,answerId:[]}
    else if (question.type=== "single-choice")
      return {...question,answerId:undefined} as SingleChoiceQuestion;
    return question;
  }) ;
  const [questions, setQuestions] = useState<QuestionInterface[]>(qq) ;
  console.log(questions);
  return (
    <>
      {/* <EditMultipleChoice qdata={dummyQuestions[0]} addQuestion={null}/> */}
      {
        questions.map((question,index) => {
          return <Question qdata={question} setQuestion={(ques:QuestionInterface) => { 
                          const newquestions = [...questions];
                          newquestions[index] = ques ;
                          console.log(newquestions) ;
                          setQuestions(newquestions) ;
                        }
                        } 
                        
                  key={index}/>
        })
      }
      {/* <MultipleChoice qdata={dummyQuestions[1]} editActions={{}}/> */}
    </>
  );
}
>>>>>>> master
