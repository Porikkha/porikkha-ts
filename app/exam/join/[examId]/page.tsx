'use client';
import SingleChoiceQuestion from '@/interfaces/question/SingleChoiceQuestion';
import Question from '@/components/questions/Question';
import type QuestionInterface from '@/interfaces/question/Question';
import { useEffect, useState } from 'react';

import { dummyExam } from '@/interfaces/Exam';
import ExamViewBanner from '@/components/exam/ExamViewBanner';
import { useSession } from 'next-auth/react';
import type Exam from '@/interfaces/Exam';
import type Submission from '@/interfaces/Submission';
import type { Answer, MultipleChoiceAnswer, SingleChoiceAnswer } from '@/interfaces/Submission';
import SuccessAlert from '@/components/ui/SuccessAlert';


export default function Page({ params }: { params: { examId: string } }) {
  let qq = dummyExam.questions;
  qq = qq.map((question, index) => {
    if (question.type === 'short-answer') return { ...question, referenceAnswer: '' };
    else if (question.type === 'multiple-choice') return { ...question, answerId: [] };
    else if (question.type === 'single-choice')
      return { ...question, answerId: undefined } as SingleChoiceQuestion;
    return question;
  });

  const {data:session} = useSession(); 
  const [questions, setQuestions] = useState<QuestionInterface[]>(qq);
  const [exam,setExam] = useState(dummyExam);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const fetchExam = async (examId: string) => {
    const response = await fetch(`/api/exams/${params.examId}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.status == 200 && data.exam) {
      const exam = data.exam;
      setExam(exam);
      // setExamName(exam.title);
      // setExamDesc(exam.description);
      // setStartTime(new Date(exam.startTime).toTimeString());
      // setStartTimeFormatted(new Date(exam.startTime).toLocaleString());
      setQuestions(exam.questions);
      // setExamDuration(exam.duration.toString());
    }
  };
  const handleAnswerSubmit = async(event: any) => {
    event.preventDefault();
    const userId = session?.user?.id;
    if (!userId) {
      console.log('❌ ~ file: page.tsx:202 : creatorId not found');
      return;
    }
    const submission: Submission = {
      examId: params.examId,
      userId: userId,
      answers: questions.map((question) => {
        if (question.type === 'short-answer') {
          return {
            questionId: question.id,
            type: 'short-answer',
            answer: (question as any).referenceAnswer,
          } as Answer;
        } else if (question.type === 'multiple-choice') {
          return {
            questionId: question.id,
            type: 'multiple-choice',
            answer: (question as any).answerId,
          } as MultipleChoiceAnswer;
        } else if (question.type === 'single-choice') {
          return {
            questionId: question.id,
            type: 'single-choice',
            answer: (question as any).answerId,
          } as SingleChoiceAnswer;
        }
        return {} as Answer;
      }),
      submissionTime: new Date(),
      score: 0,
   };
   console.log('🚀 ~ file: page.tsx:138 ~ handleExamSubmit ~ exam:', exam);

    const response = await fetch('/api/exams/submit', {
      method: 'POST',
      body: JSON.stringify({
        submission: submission,
      }),
    });
    const data = await response.json();
    setShowSuccessAlert(data.status == 200);
  };
  useEffect(() => {
    fetchExam(params.examId);
  }, [params.examId]);


  return (
    <section className='w-full'>
    <SuccessAlert
        showSuccessAlert={showSuccessAlert}
        setShowSuccessAlert={setShowSuccessAlert}
      />
      <ExamViewBanner exam={exam} />
      <div className='mx-auto w-4/5'>
        {questions.map((question, index) => {
          return (
            <Question
              qdata={question}
              setQuestion={(ques: QuestionInterface) => {
                const newquestions = [...questions];
                newquestions[index] = ques;
                console.log(newquestions);
                setQuestions(newquestions);
              }}
              key={index}
            />
          );
        })}
      </div>
      <div className='mx-auto w-4/5'>
        <form
          className='float-right py-5'
          onSubmit={handleAnswerSubmit}
        >
          <button
            type='submit'
            className='rounded-md bg-purple-700/70 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Submit{' '}
          </button>
        </form>
      </div>
    </section>
  );
}
