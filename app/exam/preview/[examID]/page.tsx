'use client';
import { useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@mui/joy';

import { getTimeDifference } from '@/utils/helper';

const ExamBanner = ({ params }: { params: { examID: string } }) => {
  const [title, setTitle] = useState<string>('Loading data...');
  const [totalTime, setTotalTime] = useState<string>('00 Minutes');
  const [startTime, setStartTime] = useState<string>('00:00 AM');
  const [endTime, setEndTime] = useState<string>('00:00 AM');
  const [remainingTime, setRemainingTime] = useState<string>('00:00');
  const [open, setOpen] = useState(false);
  const description =
    "Once you start, you can't pause the timer. Don't worry, Forms gives you a final minute reminder before submission. Your answers will be automatically submitted when the time is up. Please prepare before you begin to help manage your submission time.";
  const fetchExamMetadata = async () => {
    const res = await fetch(`/api/exams/preview/${params.examID}`, {
      method: 'GET',
    });
    const data = await res.json();
    if (data.status === 200) {
      const exam = data.exam;
      setTitle(exam.title);
      setTotalTime(exam.duration.toString() + ' Minutes');
      setStartTime(new Date(exam.startTime).toLocaleTimeString());
      const endTime = new Date(exam.startTime).getTime() + exam.duration * 60 * 1000;
      setEndTime(new Date(endTime).toLocaleTimeString());
      const interval = setInterval(() => {
        setRemainingTime(getTimeDifference(new Date(endTime)));
      }, 1000);
      return () => clearInterval(interval);
    }
  };
  useEffect(() => {
    fetchExamMetadata();
  }, []);
  return (
    <section className='m-8 w-4/5 rounded-xl bg-purple-100'>
      <div className='rounded-xl bg-purple-400/20 p-4 text-violet-900'>
        <h1 className='px-4 text-3xl font-bold'>{title}</h1>
      </div>
      <div className='p-5'>
        <div className='flex justify-between space-x-4'>
          <div className='rounded-full bg-purple-500/40 p-2 px-5 text-sm font-semibold text-violet-950'>
            Total Time: {totalTime}
          </div>
          <div className='rounded-full bg-purple-500/40 p-2 px-5 text-sm font-semibold text-violet-950'>
            Start Time: {startTime}
          </div>
          <div className='rounded-full bg-purple-500/40 p-2 px-5 text-sm font-semibold text-violet-950'>
            End Time: {endTime}
          </div>
        </div>
        <p className='mb-4 mt-4 font-semibold text-gray-700'>{description}</p>
        <div className='flex items-center'>
          <button onClick={() => setOpen(true)} className='reminder_btn my-5'>
            Add Reminder
          </button>
          <div className='flex items-center px-5'>
            <span className='font-semibold text-slate-900'>Remaining Time:</span>
            <span className='ml-2 text-orange-600'>{remainingTime}</span>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          aria-labelledby='reminder-modal-dialog-title'
          aria-describedby='reminder-modal-dialog-description'
          className='mx-auto max-w-md translate-y-1/2 transform rounded-xl bg-white p-8'
        >
          <Typography id='reminder-modal-dialog-title' level='h2'>
            Add Reminder
          </Typography>
          <Typography id='reminder-modal-dialog-description'>
            We will remind you at the specified time.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Remind me at:</FormLabel>
                <Input type='datetime-local' required />
              </FormControl>
              <FormControl>
                <FormLabel>Message</FormLabel>
                <Input required />
              </FormControl>
              <Button type='submit' variant='soft'>
                Set Reminder
              </Button>
            </Stack>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default ExamBanner;
