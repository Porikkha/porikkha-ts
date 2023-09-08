'use client';
import ThreadCard from '@/components/discussion/ThreadCard';
import EditQuestion from '@/components/questions/EditQuestion';
import EditQuestionModal from '@/components/questions/EditQuestionModal';
import { dummyQuestions } from '@/interfaces/question/MultipleChoiceQuestion';
import { useState } from 'react';

export default function Page() {
  const [ques, setQues] = useState(dummyQuestions[1]);
  return (
    <>
      <ThreadCard></ThreadCard> 
    </>
  );
}
