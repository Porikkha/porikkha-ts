import { Badge, Chip } from '@mui/joy';
import { Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';

export default function DiscussionCard() {
  return (
    <div className='m-2 rounded-md border border-purple-200 p-2'>
      <div className='flex px-2'>
        <Typography className='py-2 text-base' > Request for postponing 2nd CT. </Typography>
        <div className='ml-auto float-right flex'>
            <Typography className='p-2 text-xs' > By Herper Lee </Typography>
            <Avatar size="sm">JG</Avatar>
        </div>
      </div>
      <Divider />
      <div>
        <Typography className='p-2 text-sm' >
        2 CT overlap on the same day. It would be great if you could postpone this CT to other day. 
        We have an empty slot on Wednesday, 8AM to 10AM. 
        </Typography>

      </div>

      <div className='flex p-2'>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
        <Badge badgeContent={10} size="sm">
          <LiaCommentSolid className="my-1 mx-2"/>
          <Typography fontSize="xl"></Typography>
        </Badge>
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
