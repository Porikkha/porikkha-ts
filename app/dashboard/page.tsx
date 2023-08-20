"use client";

import { Button, Chip, CircularProgress, Divider, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import Exam, { dummyExam } from "@/interfaces/Exam";
import { useSession } from "next-auth/react";
import formatTime, { formatDuration } from "@/utils/timeUtils";
import { useRouter, useSearchParams } from 'next/navigation';
import SuccessAlert from "@/components/ui/SuccessAlert";
import { Router } from "next/router";

export default function Page() {
    const [username, setUsername] = useState("Alex");
    const [exams, setExams] = useState([dummyExam]);
    const [loading, setLoading] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams()

    const editExam = (examId : any) => {
        router.push(`/exam/create/${examId}`);
    }

    if (searchParams.has("status") && searchParams.get("status") == "success") {
        console.log("Slow Alert") ;
    }

    const { data: session } = useSession();
    console.log('😁 User: ', session?.user);

    const fetchExams = async () => {
        if (!session?.user?.id) return;
        const res = await fetch(`/api/exams/getAll/${session?.user?.id}`);
        const data = await res.json();
        console.log(data);
        let newExamList = data.exams.map((exam: any) => {
            let e : Exam = {
                examId: exam.id, 
                creatorId: exam.creatorId,
                description: exam.description,
                duration: exam.duration,
                startTime: new Date(exam.startTime),
                title: exam.title,
                questions: [],
                allowedAbilities: []
            }
            return e;
        });
        console.log("🚀 ~ file: page.tsx:37 ~ newExamList ~ newExamList:", newExamList)

        setExams(newExamList);
        // setExams(data);
        setLoading(false);
    }

    useEffect(() => {
        console.log("Call useeffect")
        fetchExams();
    }, [session?.user?.id]);

    const ExamGrid = () => {
        return (
            <div className="p-5">
                <div className="flex flex-wrap -mx-4">
                    {exams.map((exam, index) => (
                        <div className="w-1/3 px-4 mb-4" key={index}>
                            <ExamCard exam={exam} editExam={editExam}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


	return (
		<section className="w-full">
			<div className="w-4/5 mx-auto bg-white rounded-md p-5">
                <Typography className="text-3xl pb-2">Welcome {username}</Typography>
                <Divider className="bg-slate-200"/>
                <Typography className="text-sm pt-2">Your have scheduled <span className="text-purple-400"> {exams.length} Exams </span> </Typography>


                { loading && <div className="w-full flex justify-center py-10"> <CircularProgress variant="soft"/> </div>}
                { !loading && <ExamGrid /> }
                <SuccessAlert
                    showSuccessAlert={showSuccessAlert}
                    setShowSuccessAlert={setShowSuccessAlert}
                />
			</div>
		</section>
	);
}

const ExamCard = ({exam, editExam} : any) => {
    return (
        <div className="w-64 bg-fade-purple hover:border-cyan-100 rounded-md p-5">
            <Typography className="text-sm pb-1 font-bold">{exam.title}</Typography>
            <Divider className="bg-slate-200"/>
            <Typography className="text-xs pt-1 font-medium">Start : { formatTime(exam.startTime)} </Typography>
            <Typography className="text-xs pt-1 font-medium">Duration : { formatDuration(exam.duration) } </Typography>
            <Typography className="text-xs pt-1 font-medium">Submissions : {0} </Typography>

            <div className="w-full flex justify-center">
            <Button className="bg-white text-purple-500 border-purple-500 hover:text-white hover:bg-purple-300 border-2 rounded-md mt-5" 
                onClick={
                    () => editExam(exam.examId)
                }
            >View</Button>
            </div>
        </div>
    )
}