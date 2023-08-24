import Submission from '@/interfaces/Submission';
import formatTime, { formatDuration } from '@/utils/timeUtils';
import { Button, Divider, Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';

const SubmissionCard = ({ submission }: { submission: Submission }) => {
  const router = useRouter();

  const editSubmission = (examID: any) => {
    router.push(`/exam/join/${examID}`);
  };

  return (
    <div className='w-64 rounded-md bg-fade-purple p-5 hover:border-cyan-100'>
      <Typography className='pb-1 text-sm font-bold'>{submission.examID}</Typography>
      <Divider className='bg-slate-200' />
      {/* <Typography className="text-xs pt-1 font-medium">Submission Time: { formatTime(submission?.submissionTime!)} </Typography> */}
      <Typography className='pt-1 text-xs font-medium'>
        Score : {submission.score}{' '}
      </Typography>

      <div className='flex w-full justify-center'>
        <Button
          className='mt-5 rounded-md border-2 border-purple-500 bg-white text-purple-500 hover:bg-purple-300 hover:text-white'
          onClick={() => editSubmission(submission.examID)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default SubmissionCard;
