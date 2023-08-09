import { useState } from 'react';
import { Button, Input, Select, MenuItem, IconButton } from '@mui/joy';
import { AddCircleOutline } from '@mui/icons-material';

const QuestionForm = ({ question, onDone }) => {
  const [type, setType] = useState(question?.type || 'multiple-choice');
  const [title, setTitle] = useState(question?.title || '');
  const [description, setDescription] = useState(question?.description || '');
  const [choices, setChoices] = useState(question?.choices || ['']);

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onDone({ type, title, description, choices });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select value={type} onChange={(e, newVal) => setType(newVal)}>
        <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
        <MenuItem value="short-answer">Short Answer</MenuItem>
      </Select>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} label="Question Title" />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} label="Question Description" />
      {type === 'multiple-choice' && choices.map((choice, index) => (
        <Input key={index} value={choice} onChange={(e) => handleChoiceChange(index, e.target.value)} label={`Choice ${index + 1}`} />
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