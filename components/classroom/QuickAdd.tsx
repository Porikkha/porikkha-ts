import { Input, Typography } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function QuickAdd() {

  const router = useRouter();
  const [examCode, setExamCode] = useState("");

  const handleAdd = () => {
    console.log("Adding " + examCode);
    router.push('/classroom/add/' + examCode);
  };

  return (
    <div className="flex py-2 space-x-4 ">
        <Typography className='py-2 text-xl'>
            Add Exam <span className=" text-slate-200"> | </span>
        </Typography>
        <Input className="w-32 my-auto mx-5 h-6 " value={examCode} onChange={
            (e) => setExamCode(e.target.value)
        }/>
        <button onClick={handleAdd} className="my-auto h-8 px-5 text-icon-purple font-medium transition-colors duration-150 border border-icon-purple rounded-md focus:shadow-outline hover:bg-fade-purple ">
            Add
        </button>
    </div>
  );
}

