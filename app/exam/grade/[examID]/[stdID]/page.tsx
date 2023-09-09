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
import ExamGradingBanner from '@/components/exam/ExamGradingBanner';
import { exampleSubmission } from '@/interfaces/Submission';
import GradeQuestion from '@/components/questions/GradeQuestion';

export default function Page({ params }: { params: { examID: string; stdID: string } }) {
  console.log(params.examID, params.stdID);

  const router = useRouter();
  const [exam, setExam] = useState(dummyExam);
  const [submission, setSubmission] = useState<Submission >(); // exampleSubmission);

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
        const submission = data.submission;
        console.log(exam);
        console.log(submission);
        setExam(exam);
        setSubmission(submission);
      }
    }
  };

    const handleSubmission = async (e: any) => {
        console.log("Clicked");
        // submission.achievedMarks=20;
        e.preventDefault();
        const response = await fetch(`/api/exams/response/`, {
            method: 'POST',
            body: JSON.stringify(submission),
        });
        const body = await response.json();
        if (body.status == 200) {
            router.push(`/exam/results/${params.examID}`);
        }
        // if (response.redirected) {
        //     router.push(response.url);
        // }
    }
    useEffect(() => {
        fetchExam(params.examID);
    }, []);
  // console.log(exam);
  // console.log(submission);
  return (
    <>
    <div className='w-full'>
        {submission && ( <><ExamGradingBanner exam={exam} submission={submission} />
        <div className='w-4/5 m-auto'>
        {
            exam.questions.map((question: QuestionInterface, index: number) => {
                return <GradeQuestion qdata={question} adata={submission.answers[index]} setScore={(score: number) => {
                    console.log("Score: ", score) 
                    let newSubmission = {...submission};
                    newSubmission.answers[index].score = Number(score);
                    newSubmission.achievedMarks = newSubmission.answers.reduce((acc, cur) => acc + cur.score! , 0);
                    setSubmission(newSubmission);
                    console.log(submission);
                    // submission.answers[index].score = score;
                    // submission.achievedMarks
                }}/>
            })
        } 
        </div>
        
        </>)
      }
      <div className='mx-auto w-4/5'>
        <form className='float-right py-5' onSubmit={handleSubmission}>
          <button
            type='submit'
            className='rounded-md bg-purple-700/70 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Submit{' '}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
