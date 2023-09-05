'use client';
import DiscussionCard from '@/components/classroom/DiscussionCard';
import ExamCard from '@/components/classroom/ExamCard';
import Sidebar from '@/components/dashboard/Sidebar';
import Thread from '@/components/discussion/Thread';
import BorderedButton from '@/components/ui/BorderedButton';
import UserMini from '@/components/user/UserMini';
import { Avatar, Box, Card, CardContent, Chip, Divider } from '@mui/joy';
import { CardHeader, Typography } from '@mui/material';

export default function Page() {
  return (
    <>
      <Sidebar />
      <section className='w-full pl-16'>
        <div className='grid grid-cols-7 gap-2 p-5'>
          <div className='col-span-7 h-screen rounded-md bg-light-gray p-5'>
            <div className='flex' style={{justifyContent:"space-between"}}>
              {/* <Typography className='pb-2 text-3xl font-semibold'>
                Operating Systems - Classroom
              </Typography> */}
              {/* <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              > */}
                <Box>
                  <Typography className='pb-2 text-3xl font-semibold'>
                    Operating Systems - Classroom
                  </Typography>
                </Box>
                <UserMini userID={'123'} />
              </div>

              <div className='float-right ml-auto'>
               
              {/* </div> */}
            </div>
           
            <Divider className='bg-slate-200' /> 
            <div style={{display:"flex",padding:"20px"}}>
              {/* <Typography className='py-2 text-xl font-medium'>
                Join Code : A3C1YT
              </Typography>  */}
              <BorderedButton
                  onClick={() => {
                    console.log('Hello');
                  }}
                >
                  Back to Classroom
                </BorderedButton>

                <Typography sx={{marginLeft:"20px"}}>
                    Thread: Solutions of 1st CT
                </Typography>
            </div>
            {/* <div className='my-2 flex gap-1'>
              <Avatar size='sm'>JG</Avatar>
              <Avatar size='sm'>RM</Avatar>
              <Avatar size='sm'>SB</Avatar>
              <Avatar size='sm'>+9</Avatar>

              <Chip
                className='float-right ml-auto'
                color='success'
                onClick={function () {}}
                variant='outlined'
              >
                + Invite
              </Chip>
            </div> */}
            <div className='my-10'>
              <Thread />
            </div>
          </div>
          {/* <div className='col-span-2 h-screen bg-light-gray p-3'>
            <Typography className='p-2 text-xl font-medium'>Next Exams</Typography>
            <ExamCard />
            <ExamCard />
            <ExamCard />
          </div> */}
        </div>
      </section>
      {/* <CardContent sx={{width:"full",background:"var(--clr-ghostwhite-100)"}}>
      
        <Card>
            <CardContent>
                <DiscussionCard/>
                <DiscussionCard/>
                <DiscussionCard/>
                <DiscussionCard/>
            </CardContent>

        </Card>

        </CardContent> */}
    </>
  );
}
