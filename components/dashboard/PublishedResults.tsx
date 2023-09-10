import { Button } from '@mui/material';
import ResultCard from './ResultCard';
import Exam from '@/interfaces/Exam';
import { Divider, Typography, Input } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import SuccessAlert from '../ui/SuccessAlert';
import Submission from '@/interfaces/Submission';

export default function PublishedResults() {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState();
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    if (!session?.user?.id) return;
    const response = await fetch('/api/exams/results/own', {
      method: 'GET',
    });
    const data = await response.json();
    setSubmissions(data.rows);
    setLoading(false);
    console.log("-------------------------");
    console.log(data.rows);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [session?.user?.id]);

  return (
    <> 
    <div >
      <Typography className='p-5 text-base font-bold'>Published Results</Typography>

      {loading ? (
        <Loading />
      ) : (
        <>
        {
          submissions?.map((submission: any, index: number) => (
            <ResultCard title={submission.exam.title} score={submission.achievedMarks} total={submission.exam.totalMarks} examID={submission.examID} />
          ))
        } 
        </>
      )}
    </div>
    </>
  );
}
