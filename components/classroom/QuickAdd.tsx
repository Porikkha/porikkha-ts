import { Input, Typography } from '@mui/joy';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuickAdd({ classroomID }: { classroomID: string }) {
  const router = useRouter();
  const [examCode, setExamCode] = useState('');

  const handleAdd = async (e: any) => {
    e.preventDefault();
    if (examCode.length != 6) return;
    const res = await fetch('/api/classroom/add', {
      method: 'POST',
      body: JSON.stringify({
        examID: examCode,
        classroomID: classroomID,
      }),
    });
  };

  return (
    <div className='flex space-x-4 py-2 '>
      <Typography className='py-2 text-xl'>
        Add Exam <span className=' text-slate-200'> | </span>
      </Typography>
      <Input
        className='mx-5 my-auto h-6 w-32 '
        value={examCode}
        onChange={(e) => setExamCode(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className='focus:shadow-outline my-auto h-8 rounded-md border border-icon-purple px-5 font-medium text-icon-purple transition-colors duration-150 hover:bg-fade-purple '
      >
        Add
      </button>
    </div>
  );
}
