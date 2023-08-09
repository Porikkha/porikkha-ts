"use client"

import MultipleChoice from "@/components/questions/MultipleChoice";
import ShortText from "@/components/questions/ShortText";
import Label from "@/components/ui/Labels";
import { Input, Switch, Typography, Modal, ModalDialog, Stack, FormControl, FormLabel, Button } from "@mui/joy";
import { useState } from "react";
import { addItem } from "@/app/actions/submit-action";
import Link from "next/link";
import {createExam} from "@/app/actions/create-exam-action";
import { useSession } from "next-auth/react";
import AddIcon from '@mui/icons-material/Add';
import AddQuestionModal from "@/components/questions/AddQuestionModal";
import EditExamDetailsModal from "@/components/questions/EditExamDetailsModal";
import ExamBanner from "@/components/questions/ExamBanner";
import SuccessAlert from "@/components/ui/SuccessAlert";

const questions = [
{TYPE: "MCQ", NUMBER:1, QUESTION:"What is the full form of FCFS? ", OPTIONS:["First Come First Serve", "First Serve First Come", "First Crow First Sheet", "First Cross First Serve"]},
{TYPE: "Short", NUMBER:2, QUESTION:"Hello ? ", OPTIONS:["1", "2"]},
{TYPE: "MCQ", NUMBER:3, QUESTION:"What is the full form of FCFS? ", OPTIONS:["First Come First Serve", "First Serve First Come", "First Crow First Sheet", "First Cross First Serve"]},
]

const Home = () => {
  const [open, setOpen] = useState(false);
  const [addQuestionOpen, setAddQuestionOpen] = useState(false);

  const [examName, setExamName] = useState("Exam Name");
  const [examDesc, setExamDesc] = useState("Exam Description");
  const [startTime, setStartTime] = useState("2023-08-23T18:35");
  const [startTimeFormatted, setStartTimeFormatted] = useState("30 January 2022 , 10:00PM");
  const [examDuration, setExamDuration] = useState("30:00");

  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [allowKeyboardShortcuts, setAllowKeyboardShortcuts] = useState(false);
  const [enableAutoGrading, setEnableAutoGrading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
    enableAutoGrading
  };

  const [quess,setQuess] = useState(questions) ;

  const { data : session } = useSession();

  return (
    <section className="w-full">
      <ExamBanner values={values} setters={setters} />
      <EditExamDetailsModal open={open} setOpen={setOpen} values={values} setters={setters} />
      <SuccessAlert showSuccessAlert={showSuccessAlert} setShowSuccessAlert={setShowSuccessAlert} />
      
      <div className="w-4/5 mx-auto">
        {
          quess.map((question,index) =>{
            return (<div className="py-2" key={index}> 
                     <MultipleChoice qdata={question}/>
                  </div>);
          })
        }
            <button  onClick={() => setAddQuestionOpen(true)} className="bg-purple-500 text-white font-semibold py-2 px-2 border hover:border-primary rounded float-left my-5" >
            <AddIcon className="p-1"/> 
            <div className="float-right mr-2">
              Question 
            </div>
            </button>

        <AddQuestionModal open={addQuestionOpen} setOpen={setAddQuestionOpen} addQuestion={(data) => {
          setQuess([...quess,data]) ;
        }}/>

        <form className="float-right py-5"
        onSubmit={(event) => {
          event.preventDefault();
          createExam(quess, session.user.id);
          setShowSuccessAlert(true);
        }}
        >
          <button type="submit" className="bg-purple-700/70 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500">Save </button>
        </form>
        
      </div>
    </section>
  );
};

export default Home;
