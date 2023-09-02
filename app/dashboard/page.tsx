'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamGrid } from '@/components/exam/ExamGrid';
import { SubmissionGrid } from '@/components/submission/SubmissionGrid';
import Sidebar from '@/components/dashboard/Sidebar';

export default function Page() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  return (
    <>
      <Sidebar />
      <section className='w-full'>
        <div className='w-4/5 rounded-md bg-white p-5 h-screen'>
          <Typography className='pb-2 text-3xl'>
            Welcome, {session?.user.name!}
          </Typography>
          <ExamGrid />
          <SubmissionGrid />
        </div>
      </section>
    </>
  );
}
