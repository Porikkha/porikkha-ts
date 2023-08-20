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

export default function ExamBanner({ values, setters }: any) {
  return (
    <div className='mx-auto w-4/5 items-center space-x-4 rounded-xl bg-white px-20 py-10'>
      <div className='w-full'>
        <div className='w-full'>
          <span className='font-sans text-4xl font-bold text-black'>
            {' '}
            {values.examName}
          </span>
          <button className='bg-light text-pdark hover:border-primary float-right mx-2 rounded border px-4 py-2 font-semibold'>
            <Link href={'/exam/preview/' + values.examId}>Preview</Link>
          </button>
          <button
            onClick={() => setters.setOpen(true)}
            className='bg-light text-pdark hover:border-primary float-right mx-2 rounded border px-4 py-2 font-semibold'
          >
            Edit{' '}
          </button>
        </div>
        <p className='text-gray-500'>{values.startTimeFormatted}</p>

        <div className='flex items-center py-5'>
          <div className='flex items-center space-x-4'>
            <Switch
              variant='soft'
              checked={values.shuffleQuestions}
              onChange={(e) => setters.setShuffleQuestions(e.target.checked)}
            />
            <Label>Shuffle Questions</Label>
          </div>
          <div className='mx-5 flex items-center space-x-4'>
            <Switch
              variant='soft'
              checked={values.allowKeyboardShortcuts}
              onChange={(e) => setters.setAllowKeyboardShortcuts(e.target.checked)}
            />
            <Label>Allow Keyboard Shortcuts</Label>
          </div>
          <div className='flex items-center space-x-4'>
            <Switch
              variant='soft'
              checked={values.enableAutoGrading}
              onChange={(e) => setters.setEnableAutoGrading(e.target.checked)}
            />
            <Label>Enable Auto Grading</Label>
          </div>
        </div>

        <div className='flex'>
          <div className='py-2'>
            <Label>Duration : </Label>
          </div>
          <Input
            className='mx-5 w-20'
            value={values.examDuration}
            onChange={(e) => setters.setExamDuration(e.target.value)}
          />
        </div>

        <div className='pt-2'>
          <Label>Description : {values.examDesc}</Label>
        </div>
      </div>
    </div>
  );
}
