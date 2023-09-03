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
  Card,
  IconButton,
} from '@mui/joy';
import Label from '@/components/ui/Labels';
import { Edit } from '@mui/icons-material';
import {EditNote } from '@mui/icons-material';


export default function ExamBanner({ values, setters }: any) {

  const isStartTimeValid = () => {
    const startTime = new Date(values.startTime);
    const now = new Date();
    return startTime > now;
  }

  return (
    <Card className='mx-auto w-4/5 items-center space-x-4 rounded-xl bg-white px-20 py-10'>
      <div className='w-full'>
        <div className='w-full'>
          <span className='font-sans text-4xl font-bold text-black'>
            {' '}
            {values.examName}
          </span>
          <button className='bg-light text-pdark hover:border-primary float-right mx-2 rounded border px-4 py-2 font-semibold'>
            <Link href={'/exam/preview/' + values.examID}>Preview</Link>
          </button>
          {/* <button
            onClick={() => setters.setOpen(true)}
            className='bg-light text-pdark hover:border-primary float-right mx-2 rounded border px-4 py-2 font-semibold'
          >
          </button> */}
          <IconButton
            sx={{color:"var(--clr-purple-1)"}}
            onClick={() => setters.setOpen(true)}
          >
            <EditNote/> 
          </IconButton>
        </div>
        <p className='text-gray-500'>{values.startTimeFormatted} { !isStartTimeValid() && <span className='text-red-400'> (Invalid Start Time) </span>} </p>

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
    </Card>
  );
}
