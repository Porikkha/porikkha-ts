'use client';
import Editor from '@/components/Editor';
import ThreadCard from '@/components/discussion/ThreadCard';
import EditQuestion from '@/components/questions/EditQuestion';
import EditQuestionModal from '@/components/questions/EditQuestionModal';
import GradeQuestion from '@/components/questions/GradeQuestion';
import { Answer } from '@/interfaces';
import { dummyQuestions } from '@/interfaces/question/Question';
import { useState } from 'react';

export default function Page() {
  const [questions, setQuestions] = useState(dummyQuestions);
  console.log(questions);
  const [value,setValue] = useState('');
  return (
    <>
      {
        questions.map((question, index) => {
          return <GradeQuestion qdata={question} adata={question as Answer} setScore={(score:number) => {
            let newQuestions = [...questions];
            (newQuestions[index] as Answer).score = score;
            setQuestions(newQuestions);
          }}/>
        })
      }
      <Editor value={value} setValue={setValue}/>
    </>
  );
}
