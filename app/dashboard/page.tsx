'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import Exam, { dummyExam } from '@/interfaces/Exam';
import { useSession } from 'next-auth/react';
import formatTime, { formatDuration } from '@/utils/timeUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import SuccessAlert from '@/components/ui/SuccessAlert';
import { Router } from 'next/router';
import Sidebar from '@/components/dashboard/Sidebar';

export default function Page() {
  const [username, setUsername] = useState('Alex');
  const [exams, setExams] = useState([dummyExam]);
  const [loading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const editExam = (examId: any) => {
    router.push(`/exam/create/${examId}`);
  };

  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  const { data: session } = useSession();
  console.log('😁 User: ', session?.user);

  const fetchExams = async () => {
    if (!session?.user?.id) return;
    const res = await fetch(`/api/exams/getAll/${session?.user?.id}`);
    const data = await res.json();
    console.log(data);
    let newExamList = data.exams.map((exam: any) => {
      let e: Exam = {
        examId: exam.id,
        creatorId: exam.creatorId,
        description: exam.description,
        duration: exam.duration,
        startTime: new Date(exam.startTime),
        title: exam.title,
        questions: [],
        allowedAbilities: [],
      };
      return e;
    });
    console.log('🚀 ~ file: page.tsx:37 ~ newExamList ~ newExamList:', newExamList);

    setExams(newExamList);
    // setExams(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log('Call useeffect');
    fetchExams();
  }, [session?.user?.id]);

  const ExamGrid = () => {
    return (
      <div className='p-5'>
        <div className='-mx-4 flex flex-wrap'>
          {exams.map((exam, index) => (
            <div className='mb-4 w-1/3 px-4' key={index}>
              <ExamCard exam={exam} editExam={editExam} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Sidebar />
      <section className='w-full'>
        <div className='grid grid-cols-4 grid-flow-col'> 
            <div className='col-span-3'>
                <div className='mx-auto rounded-md h-screen bg-slate-50'>
                <Typography className='pb-2 text-3xl'>Welcome {username}</Typography>
                <Divider className='bg-slate-200' />
                <Typography className='pt-2 text-sm'>
                    Your have scheduled{' '}
                    <span className='text-purple-400'> {exams.length} Exams </span>{' '}
                </Typography>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='mx-auto rounded-md bg-slate-100 p-5'>
                    <Typography className='pt-2 text-sm'> Calendar </Typography>
                </div>
            </div>
        </div>
        <div className='mx-auto w-4/5 rounded-md bg-white p-5'>
          <Typography className='pb-2 text-3xl'>Welcome {username}</Typography>
          <Divider className='bg-slate-200' />
          <Typography className='pt-2 text-sm'>
            Your have scheduled{' '}
            <span className='text-purple-400'> {exams.length} Exams </span>{' '}
          </Typography>

          {loading && (
            <div className='flex w-full justify-center py-10'>
              {' '}
              <CircularProgress variant='soft' />{' '}
            </div>
          )}
          {!loading && <ExamGrid />}
          <SuccessAlert
            showSuccessAlert={showSuccessAlert}
            setShowSuccessAlert={setShowSuccessAlert}
          />
        </div>
      </section>
    </>
  );
}

const ExamCard = ({ exam, editExam }: any) => {
  return (
    <div className='w-64 rounded-md bg-fade-purple p-5 hover:border-cyan-100'>
      <Typography className='pb-1 text-sm font-bold'>{exam.title}</Typography>
      <Divider className='bg-slate-200' />
      <Typography className='pt-1 text-xs font-medium'>
        Start : {formatTime(exam.startTime)}{' '}
      </Typography>
      <Typography className='pt-1 text-xs font-medium'>
        Duration : {formatDuration(exam.duration)}{' '}
      </Typography>
      <Typography className='pt-1 text-xs font-medium'>Submissions : {0} </Typography>

      <div className='flex w-full justify-center'>
        <Button
          className='mt-5 rounded-md border-2 border-purple-500 bg-white text-purple-500 hover:bg-purple-300 hover:text-white'
          onClick={() => editExam(exam.examId)}
        >
          View
        </Button>
      </div>
    </div>
  );
};
