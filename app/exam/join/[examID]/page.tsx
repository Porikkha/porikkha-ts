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

export default function Page({ params }: { params: { examID: string } }) {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<QuestionInterface[]>(
    // removeAnswerFromExam(dummyExam).questions
  );
  const [exam, setExam] = useState(dummyExam);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertColor>('success'); // 'success', 'info', 'warning', 'error'
  const [alertText, setAlertText] = useState<string>('Exam saved successfully!');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mousePosition = useMousePosition();
  const [integrityScore, setIntegrityScore] = useState(100);
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [showLinearAlert, setShowLinearAlert] = useState(true);
  const [progress, setProgress] = useState(100);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // New state for interval ID

  const handleMouseEnter = () => {
    setIsMouseInside(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setShowLinearAlert(false);
    setProgress(100); // Reset the progress
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setShowLinearAlert(true);
    let decrement = 100;
    const interval = setInterval(() => {
      decrement -= 1;
      setProgress(decrement);
      if (decrement <= 0) {
        clearInterval(interval);
        setIntegrityScore(integrityScore - 2);
        setShowLinearAlert(false);
      }
    }, 30); // Decrement over 3 seconds

    setIntervalId(interval); // Store the interval ID
  };

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    if (!questions) return;
    console.log("Use Effect Called. ", integrityScore);

    submitAnswers();
    setSubmitted(true);
    setTimeout(() => {
      console.log('30 seconds passed. Flag Cleared');
      setSubmitted(false);
    }, 10000);

  }, [questions, integrityScore, submitted]);

  const fetchExam = async (examID: string) => {
    const response = await fetch(`/api/exams/join/${params.examID}`, {
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
        setQuestions(exam.questions);
        setLoading(false);
        setIntegrityScore(data.integrityScore);
      }
    }
  };


  const submitAnswers = async () => {
    const submission: Submission = {
      examID: params.examID,
      studentID: '',
      answers: questions!.map((question: QuestionInterface) => {
        if (question.type === 'short-answer') {
          return {
            questionId: (question as ShortAnswerQuestion).questionId,
            type: 'short-answer',
            answer: (question as ShortAnswerQuestion).answer,
          } as Answer;
        } else if (question.type === 'multiple-choice') {
          return {
            questionId: (question as MultipleChoiceQuestion).questionId,
            type: 'multiple-choice',
            answer: (question as MultipleChoiceQuestion).answer,
          } as MultipleChoiceAnswer;
        } else if (question.type === 'single-choice') {
          return {
            questionId: (question as SingleChoiceQuestion).questionId,
            type: 'single-choice',
            answer: (question as SingleChoiceQuestion).answer,
          } as SingleChoiceAnswer;
        }
        return {} as Answer;
      }),
      integrityScore: integrityScore,
    };
    console.log('🚀 ~ file: page.tsx:138 ~ handleExamSubmit ~ answers:', submission.answers);

    const response = await fetch('/api/exams/submit', {
      method: 'POST',
      body: JSON.stringify({
        submission: submission,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  const handleAnswerSubmit = async (event: any) => {
    event.preventDefault();
    setShowAlert(true);
    const data = await submitAnswers();
    setAlertType(data.type);
    setAlertText(data.message);
    if (data.status === 200) router.push('/dashboard?status=success');
  };
  useEffect(() => {
    fetchExam(params.examID);
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Please return to your exam';
      } else {
        document.title = 'Your Exam Title'; // Replace with your default title
        alert('Your score has been deducted');
        setIntegrityScore((prevScore) => prevScore - 2); // Deduct as needed
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        alert('Copy is not allowed!');
      } else if (e.ctrlKey && e.key === 'v') {
        alert('Paste is not allowed!');
      }
      // Can add more here
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section
      className={`gradient-border w-full ${!isMouseInside ? 'alert' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='left-gradient'></div>
      <div className='right-gradient'></div>
      <GenericAlert
        show={showAlert}
        setShow={setShowAlert}
        type={alertType}
        text={alertText}
      />
      <ExamViewBanner exam={exam} />
      <div className='text-center'>
        <p
          className={`text-lg font-bold ${
            isMouseInside ? 'text-green-900' : 'text-red-900'
          }`}
        >
          Cursor location (x , y) = ({mousePosition.x}, {mousePosition.y})
          {!isMouseInside && ' - Please return to your exam.'}
        </p>
        <p className='text-lg font-bold'>Integrity Score: {integrityScore}</p>
      </div>
      <div className='mx-auto w-4/5 space-y-5'>
        {loading ? (
          <Loading />
        ) : (
          questions?.map((question, index) => {
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
          })
        )}
      </div>
      <div className='mx-auto w-4/5'>
        <form className='float-right py-5' onSubmit={handleAnswerSubmit}>
          <button
            type='submit'
            className='rounded-md bg-purple-700/70 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Submit{' '}
          </button>
        </form>
      </div>
      <LinearAlert showLinearAlert={showLinearAlert} progress={progress} />
    </section>
  );
}
