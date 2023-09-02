'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamGrid } from '@/components/exam/ExamGrid';
import { SubmissionGrid } from '@/components/submission/SubmissionGrid';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  return (
    <>
      <Sidebar />
      <section className='w-full pl-16'>
        <div className='grid grid-cols-7 gap-2'>
          <div className='col-span-5 rounded-md bg-light-gray p-5 h-screen'>
            <div className='flex'>
            <Typography className='pb-2 text-3xl'>
              Welcome, {session?.user.name!}
            </Typography>
            <Link href='/profile' className='ml-auto float-right'>
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>

            </div>
            <ExamGrid />
            <SubmissionGrid />
          </div>
          <div className='col-span-2 bg-light-gray p-3 h-screen'>
            <Typography className='pb-2 text-2xl'>
              Calendar
            </Typography>
          </div>

        </div>
      </section>
    </>
  );
}
