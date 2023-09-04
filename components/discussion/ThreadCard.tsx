import { Box, Button, Card, IconButton, Typography } from '@mui/joy';
import { DiscussionThread } from '@prisma/client';
import UserAvatar from '@/components/user/UserAvatar';
import { MoreVert } from '@mui/icons-material';
import { Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import TollIcon from '@mui/icons-material/Toll';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffect, useState } from 'react';

const dummyThread= {
  discussionThreadID: BigInt(1),
  classroomID: BigInt(1),
  creatorID: 'dummyid',
  title: 'Dummy Thread',
  content: 'Dummy Content',
  timePosted: new Date(),
    commentCount: 2,
    postCount: 3,

};

export default function ThreadCard({discussionThreadID}: {discussionThreadID:BigInt}) {
  const [data,setData] = useState(dummyThread);
  
  useEffect(()=>{
    // fetchData(`/api/discussion/thread/${discussionThreadID}`,(res)=>{
        // setData(res.data);
    // })
    },[]); 
  return (
    <Card sx={{ width: '90%', border: 'var(--clr-purple-1' }}>
      <Box
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
      </Box>
    </Card>
  );
}
