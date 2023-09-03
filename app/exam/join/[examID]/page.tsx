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
import SuccessAlert from '@/components/ui/SuccessAlert';
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
    removeAnswerFromExam(dummyExam).questions
  );
  const [exam, setExam] = useState(dummyExam);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const mousePosition = useMousePosition();
  const [integrityScore, setIntegrityScore] = useState(100);
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [showLinearAlert, setShowLinearAlert] = useState(true);
  const [progress, setProgress] = useState(100);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const handleMouseEnter = () => {
    setIsMouseInside(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setShowLinearAlert(false);
    setProgress(100); // Reset the progress
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
    setShowLinearAlert(true);

    const id = setTimeout(() => {
      setShowLinearAlert(false);
      setProgress(0); // Set progress to 0
    }, 3000); // 3 seconds

    setTimeoutId(id);

    let decrement = 100;
    const interval = setInterval(() => {
      decrement -= 1;
      setProgress(decrement);
      if (decrement <= 0) {
        clearInterval(interval);
        setIntegrityScore(integrityScore - 2);
      }
    }, 30); // Decrement over 3 seconds
  };

  const fetchExam = async (examID: string) => {
    const response = await fetch(`/api/exams/join/${params.examID}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.status == 200 && data.exam) {
      const exam = data.exam;
      setExam(exam);
      setQuestions(exam.questions);
      setLoading(false);
    }
  };
  const handleAnswerSubmit = async (event: any) => {
    event.preventDefault();
    const userID = session?.user?.id;
    if (!userID) {
      console.log('❌ ~ file: page.tsx:202 : creatorID not found');
      return;
    }
    const submission: Submission = {
      examID: params.examID,
      studentID: session?.user?.id!,
      answers: questions.map((question: QuestionInterface) => {
        if (question.type === 'short-answer') {
          return {
            questionId: question.id,
            type: 'short-answer',
            answer: (question as ShortAnswerQuestion).answer,
          } as Answer;
        } else if (question.type === 'multiple-choice') {
          return {
            questionId: question.id,
            type: 'multiple-choice',
            answer: (question as MultipleChoiceQuestion).answer,
          } as MultipleChoiceAnswer;
        } else if (question.type === 'single-choice') {
          return {
            questionId: question.id,
            type: 'single-choice',
            answer: (question as SingleChoiceQuestion).answer,
          } as SingleChoiceAnswer;
        }
        return {} as Answer;
      }),
      integrityScore: integrityScore,
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
      <SuccessAlert
        showSuccessAlert={showSuccessAlert}
        setShowSuccessAlert={setShowSuccessAlert}
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
          questions.map((question, index) => {
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
