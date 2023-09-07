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
          <div className='col-span-7 min-h-screen rounded-md bg-light-gray p-5'>
            <div className='flex' style={{justifyContent:"space-between"}}>
                <Box>
                  <Typography className='pb-2 text-3xl font-semibold'>
                    Operating Systems - Classroom
                  </Typography>
                </Box>
              </div>

              <div className='float-right ml-auto'>
            </div>
           
            <Divider className='bg-slate-200' /> 
            <div className='px-3 py-5 m-auto w-3/4'>
              <BorderedButton
                  onClick={() => {
                    console.log('Hello');
                  }}
                >
                  Back to Classroom
                </BorderedButton>

                <Typography className='text-3xl py-2'>
                    Thread: Solutions of 1st CT
                </Typography>
            </div>
            <div className='m-auto w-3/4'>
              <Thread />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
