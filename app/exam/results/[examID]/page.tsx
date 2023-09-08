'use client';

import Typography from '@mui/material/Typography';
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
import CustomCircularProgress from '@/components/ui/CustomCircularProgress';

export default function Page({ params }: { params: { examID: string } }) {
  function createData(
    name: string,
    answered: number,
    correct: number,
    marks: number,
    integrityScore: number
  ) {
    return { name, answered, correct, marks, integrityScore };
  }
  function arange(start: number, stop: number, step = 1) {
    if (arguments.length === 1) {
      stop = start;
      start = 0;
    }
    const length = Math.ceil((stop - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
  }

  function createMarkDistribution(rows: any, totalMarks: number, buckets = 10) {
    const bucketWidth = totalMarks / buckets;
    const yData = new Array(buckets + 1).fill(0);
    const xAxis = Array.from({ length: buckets + 1 }, (_, i) => i * bucketWidth);

    rows.forEach((row: any) => {
      console.log(row.achievedMarks);
      const bucketIndex = Math.min(Math.floor(row.achievedMarks / bucketWidth), buckets);
      yData[bucketIndex]++;
    });

    return { xAxis, yData };
  }

  const searchParams = useSearchParams();
  const [rows, setRows] = useState([createData('Deuce', 0, 0, 0, 0)]);
  const [examTitle, setExamTitle] = useState('Loading...');
  const [totalMarks, setTotalMarks] = useState(50);
  const [xAxis, setXAxis] = useState<number[]>([0, 10, 20, 30]);
  const [yData, setYData] = useState<number[]>([1, 2, 3, 4]);
  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  const fetchSubmissions = async () => {
    const response = await fetch('/api/exams/results/' + params.examID, {
      method: 'GET',
    });
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
          sub.achievedMarks,
          sub.integrityScore
        ),
      ]);
    });
    const result = createMarkDistribution(data.rows, totalMarks);
    console.log(result);
    setXAxis(result.xAxis);
    setYData(result.yData);
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
          <div className='col-span-4 flex h-screen flex-col space-y-6 bg-light-gray p-3'>
            <div>
              <Typography
                align='center'
                className='pb-2 font-inter text-3xl text-slate-700'
              >
                {examTitle}
              </Typography>
            </div>
            <div>
              <Paper>
                <LineChart
                  xAxis={[{ data: xAxis }]}
                  series={[
                    {
                      data: yData,
                    },
                  ]}
                  width={600}
                  height={300}
                />
              </Paper>
            </div>
            <div>
              <Paper>
                <CustomCircularProgress value={90} label={'Integrity Score'} />
                <CustomCircularProgress value={40} label={'Marks'} />
                <CustomCircularProgress value={60} label={'Answered'} />
              </Paper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
