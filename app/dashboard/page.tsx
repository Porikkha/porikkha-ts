"use client";

import { Button, Chip, CircularProgress, Divider, Typography } from "@mui/joy";
import { useState } from "react";
import { dummyExam } from "@/interfaces/Exam";
import { useSession } from "next-auth/react";
import formatTime, { formatDuration } from "@/utils/timeUtils";

export default function Page() {
    const [username, setUsername] = useState("Alex");
    const [exams, setExams] = useState([dummyExam]);
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();
    console.log('😁 User: ', session?.user);
    const ExamGrid = () => {
        return (<div className="p-5">
            <div className="grid grid-cols-3 gap-4">
                {exams.map((exam, index) => {
                    return <ExamCard exam={exam} key={index}/>  
                })}
            </div>
        </div>)
    }

	return (
		<section className="w-full">
			<div className="w-4/5 mx-auto bg-white rounded-md p-5">
                <Typography className="text-3xl pb-2">Welcome {username}</Typography>
                <Divider className="bg-slate-200"/>
                <Typography className="text-sm pt-2">Your have scheduled <span className="text-purple-400"> {exams.length} Exams </span> </Typography>


                { loading && <div className="w-full flex justify-center py-10"> <CircularProgress variant="soft"/> </div>}
                { !loading && <ExamGrid /> }
			</div>
		</section>
	);
}

const ExamCard = ({exam} : any) => {
    return (
        <div className="w-64 bg-fade-purple hover:border-cyan-100 rounded-md p-5">
            <Typography className="text-sm pb-1 font-bold">{exam.title}</Typography>
            <Divider className="bg-slate-200"/>
            <Typography className="text-xs pt-1 font-medium">Start : { formatTime(exam.startTime)} </Typography>
            <Typography className="text-xs pt-1 font-medium">Duration : { formatDuration(exam.duration) } </Typography>
            <Typography className="text-xs pt-1 font-medium">Submissions : {0} </Typography>

            <div className="w-full flex justify-center">
            <Button className="bg-white text-purple-500 border-purple-500 hover:text-white hover:bg-purple-300 border-2 rounded-md mt-5">View</Button>
            </div>
        </div>
    )
}