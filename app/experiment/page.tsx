
"use client"
import EditQuestion from "@/components/questions/EditQuestion";
import { dummyQuestions } from "@/interfaces/question/MultipleChoiceQuestion";
import { useState } from "react";



export default function Page(){
    const [ques,setQues] = useState(dummyQuestions[1]);
    return <>
        <EditQuestion qdata={ques} setQuestion={setQues} editActions={null} />
    </> ;
}