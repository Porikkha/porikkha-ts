import { Chip } from '@mui/joy';
import { Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function ResultCard({ title, examID, score, total }: any) {
  
  const router = useRouter();
  return (
    <div className='m-2 rounded-md border-2 border-purple-200 p-2'>
      <div className='flex px-5'>
        <Typography className='py-2 text-sm font-semibold'>{title}</Typography>
        <Typography className='py-2 text-sm font-bold ml-auto'>Score : {score} / {total}</Typography>
      </div>
      <Chip
        className='my-2 mx-5 bg-sky-100'
        color='primary'
        onClick={() => {
          console.log("CLICKED ", examID);
          router.push('/exam/view/' + examID);
        //   router.push('/exam/create/' + exam.examID);
        }}
        size='sm'
        variant='soft'
      >
        {' '}
        View
      </Chip>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
