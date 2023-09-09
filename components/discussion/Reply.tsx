import { Badge, IconButton, Chip, Card, Tooltip, Skeleton } from '@mui/joy';
import { Box, Button, Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Reply } from '@prisma/client';
import { data } from 'autoprefixer';
import UserAvatar from '../user/UserAvatar';

const dummyReply: Reply = {
  replyID: BigInt(1),
  creatorID: '1',
  postID: BigInt(1),
  content:
    '2 CT overlap on the same day. It would be great if you could postpone this CT to other day. We have an empty slot on Wednesday, 8AM to 10AM.',
};
export default function DiscussionCard() {
  return (
    <>
      <div className='m-2 rounded-md border border-purple-200 p-2'>
        <div className='flex px-2'>
          <Tooltip title='Sohaib B.' variant='solid'>
            <Avatar className='my-3' size='sm'>
              SM
            </Avatar>
          </Tooltip>
          <div className='mx-3'>
            <Typography className='p-2 text-sm'>
              2 CT overlap on the same day. It would be great if you could postpone this
              CT to other day. We have an empty slot on Wednesday, 8AM to 10AM.
            </Typography>
            <div className='flex p-2'>
              <LuCalendar className='my-auto' />
              <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
