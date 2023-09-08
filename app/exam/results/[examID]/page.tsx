'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamGrid } from '@/components/exam/ExamGrid';
import { SubmissionGrid } from '@/components/submission/SubmissionGrid';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import SubmissionTable from '@/components/results/SubmissionTable';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';

export default function Page({ params }: { params: { examID: string } }) {
  function createData(name: string, answered: number, correct: number, marks: number) {
    return { name, answered, correct, marks };
  }
  function arange(start: number, stop: number, step = 1) {
    if (arguments.length === 1) {
      stop = start;
      start = 0;
    }
    const length = Math.ceil((stop - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
  }

  const searchParams = useSearchParams();
  const [rows, setRows] = useState([createData('Deuce', 0, 0, 0)]);
  const [examTitle, setExamTitle] = useState('Loading...');
  const [totalMarks, setTotalMarks] = useState(50);
  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  const fetchSubmissions = async () => {
    const response = await fetch(
      'http://localhost:3000/api/exams/results/' + params.examID,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    console.log('🚀 ~ file: SubmissionTable.tsx:44 ~ fetchSubmissions ~ data:', data);
    setExamTitle(data.examTitle);
    // first clear all previous rows
    setRows([]);
    data.rows.forEach((sub: any) => {
      setRows((prev) => [
        ...prev,
        createData(
          sub.student.username,
          sub.totalAnswered,
          sub.totalCorrect,
          sub.achievedMarks
        ),
      ]);
    });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <>
      <Sidebar />
      <section className='w-full pl-16'>
        <div className='grid grid-cols-8 gap-7 p-5'>
          <div className='col-span-4 h-screen rounded-md bg-light-gray p-5'>
            <SubmissionTable rows={rows} />
          </div>
          <div className='col-span-4 flex h-screen flex-col bg-light-gray p-3'>
            <div>
              <Typography className='pb-2 text-3xl font-semibold'>{examTitle}</Typography>
            </div>
            <div>
              <Paper>
                <LineChart
                  xAxis={[{ data: arange(1, totalMarks, 10) }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5],
                    },
                  ]}
                  width={600}
                  height={300}
                />
              </Paper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
