import Exam from "@/interfaces/Exam";
import { Divider, Typography } from "@mui/joy";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import SubmissionCard from "./SubmissionCard";
import SuccessAlert from "../ui/SuccessAlert";
import Submission from "@/interfaces/Submission";

export function SubmissionGrid() {
    const { data: session } = useSession();
    const [submissions, setSubmissions] = useState<Submission[]>();
    const [loading, setLoading] = useState(true);
  
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
    const fetchSubmissions = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/exams/submit/getAll`);
      const data = await res.json();
      console.log(data);
      let newSubmissionList= data.submissions.map((submission: Submission) => {
        return {...submission, answers:[]};
      });
      console.log('🚀 ~ file: page.tsx:37 ~ newSubmissionList ~ newSubmissionList:', newSubmissionList);
      setSubmissions(newSubmissionList);
      setLoading(false);
    };
  
    useEffect(() => {
      console.log('Call useeffect');
      fetchSubmissions();
    }, [session?.user?.id]);
  
    return (
      <>
        <Divider className='bg-slate-200' />
        {loading ? (
          <Loading />
        ) : (
          <>
            <Typography className='pt-2 text-sm'>
              Your have submitted for{" "} 
              <span className='text-purple-400'> {submissions?.length} exams </span>{' '}
            </Typography>
            <div className='p-5'>
              <div className='-mx-4 flex flex-wrap'>
                {submissions?.map((submission, index) => (
                  <div className='mb-4 w-1/3 px-4' key={index}>
                    <SubmissionCard submission ={submission } />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <SuccessAlert
          showSuccessAlert={showSuccessAlert}
          setShowSuccessAlert={setShowSuccessAlert}
        />
      </>
    );
  }
  
    