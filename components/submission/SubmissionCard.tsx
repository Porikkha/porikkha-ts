import Submission from "@/interfaces/Submission";
import formatTime, { formatDuration } from "@/utils/timeUtils";
import { Button, Divider, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";



const SubmissionCard = ({submission} : {submission:Submission} ) => {
    const router = useRouter() ;

    const editSubmission = (examId : any) => {
        router.push(`/exam/join/${examId}`);
    }    
    
    return (
        <div className="w-64 bg-fade-purple hover:border-cyan-100 rounded-md p-5">
            <Typography className="text-sm pb-1 font-bold">{submission.examId}</Typography>
            <Divider className="bg-slate-200"/>
            {/* <Typography className="text-xs pt-1 font-medium">Submission Time: { formatTime(submission?.submissionTime!)} </Typography> */}
            <Typography className="text-xs pt-1 font-medium">Score : {submission.score} </Typography>

            <div className="w-full flex justify-center">
            <Button className="bg-white text-purple-500 border-purple-500 hover:text-white hover:bg-purple-300 border-2 rounded-md mt-5" 
                onClick={
                    () => editSubmission(submission.examId)
                }
            >View</Button>
            </div>
        </div>
    )
} 

export default SubmissionCard; 