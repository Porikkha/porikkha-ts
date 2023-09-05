import { Badge, IconButton, Chip, Card } from '@mui/joy';
import { Box, Button, Divider, Typography } from '@mui/material';
import { LuCalendar } from 'react-icons/lu';
import { LiaCommentSolid } from 'react-icons/lia';
import Avatar from '@mui/joy/Avatar';
import { MoreVert } from '@mui/icons-material';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Reply } from '@prisma/client';
import { data } from 'autoprefixer';
import UserAvatar from '../user/UserAvatar';


const dummyReply:Reply = {
    replyID:BigInt(1),
    creatorID:"1",
    postID: BigInt(1),
    content:"2 CT overlap on the same day. It would be great if you could postpone this CT to other day. We have an empty slot on Wednesday, 8AM to 10AM.",
 }
export default function DiscussionCard() {
  return (<>
    <div className='m-2 rounded-md border border-purple-200 p-2'>
        <IconButton sx={{position:"absolute", marginLeft:"87%"}}>
          <BsThreeDotsVertical />
        </IconButton>
      <div>
        <Typography className='p-2 text-sm'>
          2 CT overlap on the same day. It would be great if you could postpone this CT to
          other day. We have an empty slot on Wednesday, 8AM to 10AM.
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
    </div>

{/* <Box
  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
>
  <Typography variant='plain'>{dummyThread.title}</Typography>
  <UserAvatar userID={dummyThread.creatorID} />
  <IconButton sx={{position:"absolute", marginLeft:"96%" }}>
    <MoreVert />
  </IconButton>
</Box>
<Divider sx={{}}/>
<Typography>
  {dummyThread.content}
</Typography>
<Box
  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
>
  <Box sx={{display:"flex", flexDirection:"row"}}>
  <IconButton>
      <CommentIcon/>
  </IconButton>    
  <Typography>{data.commentCount}</Typography>    
  </Box>
  <Box sx={{display:"flex", flexDirection:"row"}}>
  <IconButton>
      <TollIcon/>
  </IconButton>        
  <Typography>{data.postCount}</Typography>
  </Box>
  <Box>
      <CalendarMonthIcon/> 
      {data?.timePosted?.toLocaleDateString()}
  </Box>

  <Button>
      View
  </Button>
</Box> */}
 </>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;