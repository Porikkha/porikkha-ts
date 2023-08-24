import formatTime, { formatDuration } from '@/utils/timeUtils';
import { Button, Divider, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

const ExamCard = ({ exam }: any) => {
  const router = useRouter();

  const editExam = (examID: any) => {
    router.push(`/exam/create/${examID}`);
  };

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
          onClick={() => editExam(exam.examID)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default ExamCard;
