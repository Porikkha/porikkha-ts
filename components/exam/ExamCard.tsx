import formatTime, { formatDuration } from "@/utils/timeUtils";
import { Button, Divider, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";



const ExamCard = ({exam} : any) => {
    const router = useRouter() ;

    const editExam = (examID : any) => {
        router.push(`/exam/create/${examID}`);
    }    
    
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
                    () => editExam(exam.examID)
                }
            >View</Button>
            </div>
        </div>
    )
} 

export default ExamCard; 