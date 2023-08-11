import React, { useState } from 'react';
import { Button, Input, Select, MenuItem, IconButton } from '@mui/joy';
import { AddCircleOutline } from '@mui/icons-material';
import { Choice } from '@/interfaces/Question';

const QuestionForm = ({ question, onDone }:any) => {
  const [type, setType] = useState(question?.type || 'multiple-choice');
  const [title, setTitle] = useState(question?.title || '');
  const [description, setDescription] = useState(question?.description || '');
  const [choices, setChoices] = useState<Choice[]>(question?.choices || ['']);

  const handleAddChoice = () => {
    // setChoices([...choices, '']);
  };

  const handleChoiceChange = (index:any, value:any) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDone({ type, title, description, choices });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Select value={type} onChange={(e, newVal) => setType(newVal)}>
        <MenuItem>Multiple Choice</MenuItem> 
        <MenuItem>Short Answer</MenuItem>
      </Select>
      <Input value={title} onChange={(e) => setTitle(e.target.value)}></Input>
      <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      {type === 'multiple-choice' && choices.map((choice, index) => (
        <Input key={index} value={choice.text} onChange={(e) => handleChoiceChange(index, e.target.value)} />
      ))}
      {type === 'multiple-choice' && (
        <IconButton onClick={handleAddChoice}>
          <AddCircleOutline />
        </IconButton>
      )}
      <Button type="submit">Done</Button>
    </form>
  );
};

export default QuestionForm;