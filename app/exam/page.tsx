"use client";

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
