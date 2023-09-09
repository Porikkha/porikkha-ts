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
import { createData, createMarkDistribution } from '@/utils/results';
import Analytics from '@/components/results/Analytics';

export default function Page({ params }: { params: { examID: string } }) {
  const searchParams = useSearchParams();
  const [rows, setRows] = useState([createData('Deuce', 0, 0, 0, 0, 0, 'None', 'None')]);
  const [examTitle, setExamTitle] = useState('Loading...');
  const [xAxis, setXAxis] = useState<number[]>([0, 10, 20, 30]);
  const [yData, setYData] = useState<number[]>([1, 1, 1, 1]);
  if (searchParams.has('status') && searchParams.get('status') == 'success') {
    console.log('Slow Alert');
  }

  const values = {
    title: examTitle,
    xAxis,
    yData,
  };

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
          sub.integrityScore,
          sub.exam.totalMarks,
          sub.exam.examID,
          sub.student.userID
        ),
      ]);
    });
    const result = createMarkDistribution(data.rows);
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
            <SubmissionTable rows={rows} header={'Student Name'} />
          </div>
          <div className='col-span-4 flex h-screen flex-col space-y-6 bg-light-gray p-3'>
            <Analytics values={values} />
          </div>
        </div>
      </section>
    </>
  );
}
