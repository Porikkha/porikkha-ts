import ExamChip from './ExamChip';
import { Chip } from '@mui/joy';
import { Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function ExamCard({ exam }: any) {
  const date = new Date(exam.startTime);
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const router = useRouter();
  return (
    <div className='m-2 rounded-md border-2 border-purple-200 p-2'>
      <div className='flex'>
        <Typography className='py-2 text-base'>{exam.title}</Typography>
        <ExamChip startTime={exam.startTime} duration={exam.duration} />
      </div>
      <div className='flex '>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'>{time}</p>
      </div>
      <Chip
        className='m-2 bg-sky-100'
        color='primary'
        onClick={() => {
          router.push('/exam/create/' + exam.examID);
        }}
        size='sm'
        variant='soft'
      >
        {' '}
        View
      </Chip>
      <Chip
        className='m-2 bg-sky-100'
        color='primary'
        onClick={function () {}}
        size='sm'
        variant='soft'
      >
        {' '}
        Set Reminder
      </Chip>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
