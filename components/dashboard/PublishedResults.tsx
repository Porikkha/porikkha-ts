import { Input, Typography } from "@mui/joy";
import { Button } from "@mui/material";
import ResultCard from "./ResultCard";

export default function PublishedResults() {
  return (
    <div className=" ">
        <Typography className='p-5 text-base font-bold'>
            Published Results
        </Typography>
        <ResultCard title="Physics I" score="20" total="20" examId="1" />
        <ResultCard title="Chemistry II" score="15" total="20" examId="2" />
    </div>
  );
}

