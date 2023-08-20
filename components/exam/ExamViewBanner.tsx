'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Input,
  Switch,
  Typography,
  Modal,
  ModalDialog,
  Stack,
  FormControl,
  FormLabel,
  Button,
} from '@mui/joy';
import Label from '@/components/ui/Labels';

export default function ExamViewBanner({ exam }: any) {
  return (
    <div className='mx-auto w-4/5 items-center space-x-4 rounded-xl bg-white px-20 py-10'>
      <div className='w-full'>
        <div className='w-full'>
          <div className='font-sans text-3xl font-bold text-black'>{exam.title}</div>
          <div className='py-3 font-sans text-sm font-semibold text-slate-500'>
            {exam.startTime.toTimeString()}
          </div>
          <div>
            <ul className='list-disc space-y-3 pl-5 text-gray-600 marker:text-[#7FF]'>
              <li>Shortcuts : Disabled </li>
              <li>Duration : 30:00 </li>
              <li>Total Questions : 6 </li>
              <li>Total Points : 30 </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
