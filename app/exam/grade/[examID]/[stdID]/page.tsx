'use client';
import SingleChoiceQuestion from '@/interfaces/question/SingleChoiceQuestion';
import Question from '@/components/questions/Question';
import { useEffect, useState } from 'react';
import { dummyExam, removeAnswerFromExam } from '@/interfaces/Exam';
import ExamViewBanner from '@/components/exam/ExamViewBanner';
import { useSession } from 'next-auth/react';
import useMousePosition from '@/components/anticheat/MouseCursorPosition';
import type Submission from '@/interfaces/Submission';
import type {
  Answer,
  MultipleChoiceAnswer,
  ShortAnswerAnswer,
  SingleChoiceAnswer,
} from '@/interfaces';
import GenericAlert from '@/components/ui/GenericAlert';
import { AlertColor } from '@mui/material';
import {
  MultipleChoiceQuestion,
  ShortAnswerQuestion,
  Question as QuestionInterface,
} from '@/interfaces';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import LinearAlert from '@/components/anticheat/LinearAlert';
import { Typography } from '@mui/joy';

export default function Page({ params }: { params: { examID: string; stdID: string } }) {
  console.log(params.examID, params.stdID);

  const router = useRouter();
  const [exam, setExam] = useState(dummyExam);

  const fetchExam = async (examID: string) => {
    const response = await fetch(`/api/exams/response/${params.examID}/${params.stdID}`, {
      method: 'GET',
    });
    if (response.redirected) {
      router.push(response.url);
    } else {
      const data = await response.json();
      if (data.status == 200 && data.exam) {
        const exam = data.exam;
        console.log(exam);
        setExam(exam);
      }
    }
  };

    useEffect(() => {
        fetchExam(params.examID);
    }, []);

  return (
    <>
      <Typography className='p-5 text-base font-bold'>Grading</Typography>
    </>
  );
}
