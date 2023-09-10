import { Badge, IconButton, Chip, Modal, Card, Input } from '@mui/joy';
import { Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useState } from 'react';
import { DiscussionThreadInterface } from '@/interfaces/DiscussionThread';
import { useSession } from 'next-auth/react';
import Editor from '../Editor';


export default function EditDiscussionCardModal({classroomId,open, onClose}: {classroomId: string,open: boolean, onClose: any}) {
  const {data:session} = useSession() ;
  const [thread, setThread] = useState<DiscussionThreadInterface>({
    title: '',
    content: '',
    classroomID: classroomId,
    creatorID: session?.user.id,
  } as DiscussionThreadInterface);

  const handlePost = async () => {
    console.log(thread);
    thread.creatorID = session?.user.id!;
    const res = await fetch(`/api/classroom/${thread?.classroomID}/discussions`,{
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({thread: thread}),
    });
    console.log(res);
  }
  return (
    <Modal sx={{justifyContent:"center",alignContent:"center",justifySelf:"center",alignSelf:"center",width:"50%"}} open={open} onClose={onClose}>
        <Card>

    <div className='m-2 rounded-md border border-purple-200 p-2'>
      <div className='flex px-2'>
        <Typography className='py-2 text-base'>
            <Input
                className='w-full'
                value={thread?.title}
                onChange={(e) => setThread({...thread, title: e.target.value})}
            />
        </Typography>
        <div className='float-right ml-auto flex'>
          <Typography className='p-2 text-xs'> {session?.user.name} </Typography>
          <Avatar size='sm'>SG</Avatar>
        </div>
        <IconButton>
          <BsThreeDotsVertical />
        </IconButton>
      </div>
      <Divider />
      <div>
        {/* <Typography className='p-2 text-sm'>
          2 CT overlap on the same day. It would be great if you could postpone this CT to
          other day. We have an empty slot on Wednesday, 8AM to 10AM.
        </Typography> */}
        <Editor
          value={thread?.content}
          setValue={(e) => setThread({...thread, content: e})}
        />
      </div>

      <div className='flex p-2'>
        <LuCalendar className='my-auto' />
        <p className='px-3 text-sm'> 2:00 PM, 4th September </p>
        <Badge badgeContent={10} size='sm'>
          <LiaCommentSolid className='mx-2 my-1' />
          <Typography fontSize='xl'></Typography>
        </Badge>
        <Chip
          className='float-right ml-auto px-4'
          sx={{ backgroundColor: 'var(--clr-purple-3)' }}
          onClick={() => handlePost()}
          size='md'
          variant='soft'
        >
          {' '}
          Save
        </Chip>
      </div>
    </div>

        </Card>
    </Modal>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
