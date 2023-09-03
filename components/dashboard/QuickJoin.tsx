import { Input, Typography } from "@mui/joy";
import { Button } from "@mui/material";

export default function QuickJoin() {

  return (
    <div className="flex py-2 space-x-4 ">
        <Typography className='py-2 text-xl'>
            Quick Join <span className=" text-slate-200"> | </span>
        </Typography>
        <Input className="w-32 my-auto mx-5 h-6 "/>
        <button className="my-auto h-8 px-5 text-icon-purple transition-colors duration-150 border border-icon-purple rounded-md focus:shadow-outline hover:bg-fade-purple ">
            Join
        </button>
    </div>
  );
}

