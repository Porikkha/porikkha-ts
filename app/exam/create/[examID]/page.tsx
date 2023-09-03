'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import EditExamDetailsModal from '@/components/exam/EditExamDetailsModal';
import ExamBanner from '@/components/exam/ExamBanner';
import SuccessAlert from '@/components/ui/SuccessAlert';
import Question from '@/interfaces/question/Question';
import ExamInterface, { getExamTotalMarks } from '@/interfaces/Exam';

import MultipleChoiceQuestion, {
  dummyQuestions as dummyMCQs,
} from '@/interfaces/question/MultipleChoiceQuestion';
import { dummyQuestions as dummyShorts } from '@/interfaces/question/ShortAnswerQuestion';
import { dummyQuestions as dummySCQs } from '@/interfaces/question/SingleChoiceQuestion';
import { useRouter } from 'next/navigation';

const dummyQuestions = (dummyMCQs as Question[]).concat(dummySCQs).concat(dummyShorts);

import Exam from '@/interfaces/Exam';
import EditQuestionModal from '@/components/questions/EditQuestionModal';
import { CircularProgress } from '@mui/joy';

const Home = ({ params }: { params: { examID: string } }) => {
  const setQuestionNumbers = (questions: Question[]) => {
    return questions.map((question, index) => {
      question.id = index + 1;
      return question;
    });
  };

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [examName, setExamName] = useState('Exam Name');
  const [examDesc, setExamDesc] = useState('Exam Description');
  const [startTime, setStartTime] = useState('2023-08-23T18:35');
  const [startTimeFormatted, setStartTimeFormatted] = useState(
    '30 January 2022 , 10:00PM'
  );
  const [examDuration, setExamDuration] = useState('30:00');

  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [allowKeyboardShortcuts, setAllowKeyboardShortcuts] = useState(false);
  const [enableAutoGrading, setEnableAutoGrading] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [quess, setQuess] = useState<Question[]>(setQuestionNumbers(dummyQuestions));
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const setters = {
    setExamName,
    setExamDesc,
    setStartTime,
    setStartTimeFormatted,
    setExamDuration,
    setOpen,
    setShuffleQuestions,
    setAllowKeyboardShortcuts,
    setEnableAutoGrading,
  };

  const values = {
    examName,
    examDesc,
    startTime,
    startTimeFormatted,
    examDuration,
    shuffleQuestions,
    allowKeyboardShortcuts,
    enableAutoGrading,
    totalMarks: getExamTotalMarks(quess),
  };

  const deleteQuestion = (index: number) => {
    let newQuestions = [...quess];
    newQuestions.splice(index, 1);
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;
    let newQuestions = [...quess];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };

  const moveQuestionDown = (index: number) => {
    if (index === quess.length - 1) return;
    let newQuestions = [...quess];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;
    newQuestions = setQuestionNumbers(newQuestions);
    setQuess(newQuestions);
  };

  const getEditActions = (index: number) => {
    const editActions = {
      deleteQuestion: () => deleteQuestion(index),
      moveQuestionUp: () => moveQuestionUp(index),
      moveQuestionDown: () => moveQuestionDown(index),
    };
    return editActions;
  };

  const handleExamSubmit = async (event: any) => {
    event.preventDefault();
    const creatorID = session?.user?.id;
    if (!creatorID) {
      console.log('❌ ~ file: page.tsx:202 : creatorID not found');
      return;
    }
    const exam: ExamInterface = {
      creatorID: session?.user?.id!,
      examID: params.examID,
      title: examName,
      description: examDesc,
      questions: quess,
      startTime: new Date(startTimeFormatted),
      duration: parseInt(examDuration?.trim()),
      allowedAbilities: [
        {
          type: 'shuffle',
          isAllowed: shuffleQuestions,
        },
        {
          type: 'shortcuts',
          isAllowed: allowKeyboardShortcuts,
        },
        {
          type: 'auto-grade',
          isAllowed: enableAutoGrading,
        },
      ],
    };
    console.log('🚀 ~ file: page.tsx:138 ~ handleExamSubmit ~ exam:', exam);

    const response = await fetch('/api/exams', {
      method: 'POST',
      body: JSON.stringify({
        exam: exam,
      }),
    });
    const data = await response.json();

    // setShowSuccessAlert(data.status == 200);
    if( data.status != 200 ){
      alert("Exam creation failed") ;
    }  
    else router.push('/dashboard?status=success');
  };

  const fetchExam = async (examID: string) => {
    const response = await fetch(`/api/exams/${params.examID}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.status == 200 && data.exam) {
      const exam = data.exam;
      setExamName(exam.title);
      setExamDesc(exam.description);
      setStartTime(new Date(exam.startTime).toTimeString());
      setStartTimeFormatted(new Date(exam.startTime).toLocaleString());
      setQuess(setQuestionNumbers(exam.questions));
      setExamDuration(exam.duration?.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExam(params.examID);
  }, []);

  return (
    <section className='w-full'>
      <ExamBanner values={values} setters={setters} />
      <EditExamDetailsModal
        open={open}
        setOpen={setOpen}
        values={values}
        setters={setters}
      />
      <SuccessAlert
        showSuccessAlert={showSuccessAlert}
        setShowSuccessAlert={setShowSuccessAlert}
      />

      <div className='mx-auto w-4/5'>
        {loading && (
          <div className='flex w-full justify-center py-10'>
            {' '}
            <CircularProgress variant='soft' />{' '}
          </div>
        )}
        {!loading &&
          quess.map((question, index) => {
            return (
              <div className='py-2' key={index}>
                {/* <EditQuestion
                                qdata={question}
                                addQuestion={(question:Question) => {
                                    let newQuestions = [...quess] ;
                                    newQuestions[index] = question ;
                                    setQuess(newQuestions);
                                }}
                                editActions={getEditActions(index)}
                            /> */}
                <EditQuestionModal
                  key={`${index}${question.type}}`}
                  qdata={question}
                  setQuestion={(question: Question) => {
                    let newQuestions = [...quess];
                    newQuestions[index] = question;
                    setQuess(newQuestions);
                  }}
                  editActions={getEditActions(index)}
                />
              </div>
            );
          })}
        <button
          // onClick={() => setAddQuestionOpen(true)}
          onClick={() => {
            const newQuestion: MultipleChoiceQuestion = {
              id: 0,
              title: 'Set your title',
              type: 'multiple-choice',
              points: 5,
              choices: [],
              answer: [],
            };
            setQuess(setQuestionNumbers([...quess, newQuestion]));
          }}
          className='hover:border-primary float-left my-5 rounded border bg-purple-500 px-2 py-2 font-semibold text-white'
        >
          <AddIcon className='p-1' />
          <div className='float-right mr-2'>Question</div>
        </button>

        {/* <AddQuestionModal
                    open={addQuestionOpen}
                    setOpen={setAddQuestionOpen}
                    addQuestion={(data: Question) => {
                        setQuess([...quess, data]);
                        setAddQuestionOpen(false);
                    }}
                /> */}

        <form className='float-right py-5' onSubmit={handleExamSubmit}>
          <button
            type='submit'
            className='rounded-md bg-purple-700/70 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Save{' '}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Home;
