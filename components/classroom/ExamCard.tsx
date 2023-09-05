import { Chip } from '@mui/joy';
import { Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';

export default function ExamCard() {
  return (
    <div className='m-2 rounded-md border-2 border-purple-200 p-2'>
        <div className='flex'>
            <Typography className='py-2 text-base'>Operating Systems CT - 1</Typography>
            <Chip
                className='bg-orange-100 m-2 text-orange-500'
                color='primary'
                onClick={function () {}}
                size='sm'
                variant='soft'
            >
                Upcoming
                </Chip>
            
        </div>
      <div className='flex '>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
      </div>
      <Chip
        className='bg-sky-100 m-2'
        color='primary'
        onClick={function () {}}
        size='sm'
        variant='soft'
      >
        {' '}
        View
      </Chip>
      <Chip
        className='bg-sky-100 m-2'
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
