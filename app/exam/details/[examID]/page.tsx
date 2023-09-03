'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamGrid } from '@/components/exam/ExamGrid';
import { SubmissionGrid } from '@/components/submission/SubmissionGrid';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import CustomizedTables from '@/components/results/SubmissionTable';

export default function Page({ params }: { params: { examID: string } }) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  return (
    <>
      <Sidebar />
      <section className='w-full pl-16'>
        <div className='grid grid-cols-8 gap-7 p-5'>
          <div className='bg-light-gray col-span-4 h-screen rounded-md p-5'>
            <CustomizedTables examID={params.examID} />
          </div>
          <div className='bg-light-gray col-span-4 h-screen p-3'>
            <Typography className='pb-2 text-2xl'>Calendar</Typography>
          </div>
        </div>
      </section>
    </>
  );
}
