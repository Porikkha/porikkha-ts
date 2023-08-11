import { useState } from 'react';
import { Button } from '@mui/joy';
import QuestionForm from './QuestionForm';
import Exam from '@/interfaces/Exam';
import Question from '@/interfaces/Question';

const ExamForm = ({ exam, onSubmit }:{exam:Exam, onSubmit: any}) => {
  const [questions, setQuestions] = useState(exam?.questions || []);

  const handleAddQuestion = () => {
    setQuestions([...questions, {}]);
  };

  const handleQuestionDone = (index:number, question:Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ questions });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {questions.map((question, index) => (
        <QuestionForm key={index} question={question} onDone={(q:Question) => handleQuestionDone(index, q)} />
      ))}
      <Button onClick={handleAddQuestion}>Add Question</Button>
      <Button type="submit">Create Exam</Button>
    </form>
  );
};

export default ExamForm;