import { useState } from 'react';
import { Button } from '@mui/joy';
import QuestionForm from './QuestionForm';

const ExamForm = ({ exam, onSubmit }) => {
  const [questions, setQuestions] = useState(exam?.questions || []);

  const handleAddQuestion = () => {
    setQuestions([...questions, {}]);
  };

  const handleQuestionDone = (index, question) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ questions });
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <QuestionForm key={index} question={question} onDone={(q) => handleQuestionDone(index, q)} />
      ))}
      <Button onClick={handleAddQuestion}>Add Question</Button>
      <Button type="submit">Create Exam</Button>
    </form>
  );
};

export default ExamForm;