import { Badge, IconButton, Chip, Input, Button, Box, Textarea } from '@mui/joy';
import { Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Reply from './Reply';
import BorderedButton from '../ui/BorderedButton';

export default function Thread({ discussion }: any) {

  return (
    <div className='m-2 rounded-md border border-purple-200 p-2'>
      <div className='flex px-2'> 
      </div>
      <div>
        <Typography className='p-2 text-md'>
          { discussion.content }
        </Typography>
      </div>

      <div className='flex p-2'>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
        <div className='float-right ml-auto flex'>
          <Typography className='p-2 text-xs'> By Herper Lee </Typography>
          <Avatar size='sm'>JG</Avatar>
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