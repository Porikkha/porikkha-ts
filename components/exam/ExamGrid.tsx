import Exam from '@/interfaces/Exam';
import { Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ExamCard from './ExamCard';
import SuccessAlert from '../ui/SuccessAlert';

export function ExamGrid() {
  const { data: session } = useSession();
  const [exams, setExams] = useState<Exam[]>();
  const [loading, setLoading] = useState(true);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchExams = async () => {

    if (!session?.user?.id) return;
    const res = await fetch(`/api/exams/getAll/${session?.user?.id}`);
    console.log("🚀 ~ file: ExamGrid.tsx:20 ~ fetchExams ~ res :", res )
    const data = await res.json();
    console.log(data);
    let newExamList = data.exams.map((exam: any) => {
      let e: Exam = {
        examID: exam.examID,
        creatorID: exam.creatorID,
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
    setLoading(false);
  };

  useEffect(() => {
    console.log('Call use - effect');
    fetchExams();
  }, [session?.user?.id]);

  return (
    <>
      <Divider className='bg-slate-200' />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography className='pt-2 text-sm'>
            Your have scheduled{' '}
            <span className='text-purple-400'> {exams?.length} Exams </span>{' '}
          </Typography>
          <div className='p-5'>
            <div className='-mx-4 flex flex-wrap'>
              {exams?.map((exam, index) => (
                <div className='mb-4 w-1/3 px-4' key={index}>
                  <ExamCard exam={exam} />
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
