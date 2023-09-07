import { Badge, IconButton, Chip, Input, Button, Box, Textarea } from '@mui/joy';
import { Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Reply from './Reply';
import BorderedButton from '../ui/BorderedButton';

export default function DiscussionCard() {
  return (
    <div className='m-2 rounded-md border border-purple-200 p-2'>
      <div className='flex px-2'> 
                <Avatar size='sm'>JG</Avatar>
      </div>
      <div>
        <Typography className='p-2 text-md'>
          2 CT overlap on the same day. It would be great if you could postpone this CT to
          other day. We have an empty slot on Wednesday, 8AM to 10AM.
        </Typography>
      </div>

      <div className='flex p-2'>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
        <div className='float-right ml-auto flex'>
          <Typography className='p-2 text-xs'> By Herper Lee </Typography>
        </div>
      </div>
      <Divider/> 
      <Reply/>
      <Reply/>
      <Reply/>
      <Reply/>
      <Reply/>


      <Box className="px-3">
      <Textarea />
      <BorderedButton>
       Send 
      </BorderedButton>
      </Box>

    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;