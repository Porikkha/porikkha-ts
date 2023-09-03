import { Input, Typography } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function QuickJoin() {

  const router = useRouter();
  const [examCode, setExamCode] = useState("");

  const handleJoin = () => {
    console.log("Joining " + examCode);
    router.push('/exam/join/' + examCode);
  };

  return (
    <div className="flex py-2 space-x-4 ">
        <Typography className='py-2 text-xl'>
            Quick Join <span className=" text-slate-200"> | </span>
        </Typography>
        <Input className="w-32 my-auto mx-5 h-6 " value={examCode} onChange={
            (e) => setExamCode(e.target.value)
        }/>
        <button onClick={handleJoin} className="my-auto h-8 px-5 text-icon-purple transition-colors duration-150 border border-icon-purple rounded-md focus:shadow-outline hover:bg-fade-purple ">
            Join
        </button>
    </div>
  );
}

