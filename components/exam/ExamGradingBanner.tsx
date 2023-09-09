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
import { getExamTotalMarks } from '@/interfaces/Exam';
import formatTime from '@/utils/timeUtils';

export default function ExamGradingBanner({ exam, submission }: any) {

  return (
    <div className='mx-auto w-4/5 items-center space-x-4 rounded-xl bg-white px-20 py-10'>
      <div className='w-full'>
        <div className='w-full'>
          <div className='font-sans text-3xl font-bold text-black'>{exam.title}</div>
          <div className='py-3 font-sans text-sm font-semibold text-slate-500'>
            { formatTime(new Date(exam.startTime)) }
          </div>
          <div>
            <ul className='list-disc space-y-3 pl-5 text-gray-600 marker:text-[#7FF]'>
              <li>Shortcuts : </li>
              <li>Duration : {exam.duration} </li>
              <li>Total Questions : {exam.questions.length} </li>
              <li>Total Marks: {getExamTotalMarks(exam.questions)} </li>
              <li>Achieved Marks: {submission.achievedMarks} </li>
              {/* <li>Total Points : { exam.questions.} </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
