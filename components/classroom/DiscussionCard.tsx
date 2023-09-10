import { Badge, IconButton, Chip } from '@mui/joy';
import { Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DiscussionThreadInterface } from '@/interfaces/DiscussionThread';
import 'react-quill/dist/quill.snow.css';

export const formatTime = (date: Date) => {
  if( !date ) return "" ;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${ampm}, ${date.getDate()}th ${date.getMonth()}`;
};

export default function DiscussionCard({ thread }: { thread: DiscussionThreadInterface }) {
  return (
    <div className='m-2 rounded-md border border-purple-200 p-2'>
      <div className='flex px-2'>
        <Typography className='py-2 text-base'>
          {' '}
          {thread.title}{' '}
        </Typography>
        <div className='float-right ml-auto flex'>
          <Typography className='p-2 text-xs'> {  } </Typography>
          <Avatar size='sm'>JG</Avatar>
        </div>
        <IconButton>
          <BsThreeDotsVertical />
        </IconButton>
      </div>
      <Divider />
      {/* <div>
        <Typography className='p-2 text-sm'>
          2 CT overlap on the same day. It would be great if you could postpone this CT to
          other day. We have an empty slot on Wednesday, 8AM to 10AM.
        </Typography>
      </div> */}
      <div className="ql-container ql-snow" style={{ border: "none" }}>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: thread.content }}
            ></div>
          </div>
      <div className='flex p-2'>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'>  {formatTime(new Date(thread.timeCreated!))} </p>
        <Badge badgeContent={10} size='sm'>
          <LiaCommentSolid className='mx-2 my-1' />
          <Typography fontSize='xl'></Typography>
        </Badge>
        <Chip
          className='float-right ml-auto px-4'
          sx={{ backgroundColor: 'var(--clr-purple-3)' }}
          onClick={function () {}}
          size='md'
          variant='soft'
        >
          {' '}
          View
        </Chip>
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
