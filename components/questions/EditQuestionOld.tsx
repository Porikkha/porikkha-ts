'use client';
//import { Card, CardContent, Typography } from "@mui/material";
import { Card, CardContent, Checkbox, Divider, IconButton, Typography } from '@mui/joy';
import { Radio, RadioGroup, Box, Input, Button } from '@mui/joy';
import { useState } from 'react';
import { Add, Delete, Remove } from '@mui/icons-material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Question from '@/interfaces/question/Question';
import Choice from '@/interfaces/question/Choice';
import MultipleChoiceQuestion from '@/interfaces/question/MultipleChoiceQuestion';
import MiniOptions from './MiniOptions';

export function EditMultipleChoiceOptions({
  options,
  setOptions,
}: {
  options: Choice[];
  setOptions: any;
}) {
  const [newopt, setNewopt] = useState<Choice>({ text: '', id: 0 });

  const deleteOption = (indexToRemove: number) => {
    const nopt = options.filter((item, index) => index !== indexToRemove);
    setOptions(nopt);
  };
  const addOption = (option: Choice) => {
    setOptions([...options, option]);
  };
  return (
    <>
      <CardContent className='mb-5'>
        {options.map((option, index) => {
          return (
            <Box className='mx-10 my-3 flex' key={`${option}+${index}`}>
              <Checkbox className='px-5' />
              <Typography className='flex-grow'>{option.text}</Typography>
              <DeleteOutlinedIcon
                className='text-black hover:text-red-400'
                onClick={() => deleteOption(index)}
              />
            </Box>
          );
        })}
      </CardContent>
      <Box sx={{ display: 'flex' }} className='mx-10 mb-5'>
        <Typography className='px-4 py-2 align-middle'>New Option:</Typography>
        <Input
          className='flex-grow'
          value={newopt.text}
          onChange={(e) => setNewopt({ ...newopt, text: e.target.value })}
        ></Input>
        <IconButton
          className='mx-2 bg-slate-200/70 hover:bg-slate-200'
          onClick={() => addOption(newopt)}
        >
          <Add />
        </IconButton>
      </Box>
    </>
  );
}

export default function EditQuestion({
  qdata,
  addQuestion,
  editActions,
}: {
  editActions: any;
  qdata: Question;
  addQuestion: any;
}) {
  const [question, setQuestion] = useState(qdata);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {};

  const updateQuestionTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, title: e.target.value });
  };

  return (
    <Card variant='outlined' color='primary' sx={{ stroke: '#E2E3FC', margin: 'auto' }}>
      <CardContent
        sx={{
          flexDirection: 'row',
          width: '100%',
          alignContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: '#E2E3FC', // Purple color
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff', // Text color for the content inside the box
            fontWeight: 'bold', // Example: Applying a bold font weight to the text
            borderRadius: '5px',
          }}
        >
          <Typography>{qdata.id}</Typography>
        </Box>
        {/* <Typography sx={{alignSelf:"center"}}>{qdata.QUESTION}</Typography> */}
        <Input
          className='flex-grow'
          value={question.title}
          onChange={(e) => updateQuestionTitle(e)}
        />

        <Box sx={{ display: 'flex', width: '18%', marginLeft: 'auto' }}>
          <Typography className='mr-2' sx={{ alignSelf: 'center' }}>
            Points:
          </Typography>
          <Input
            value={question.points}
            onChange={(e) => {
              setQuestion({
                ...question,
                points: e.target.value as unknown as number,
              });
            }}
          />
        </Box>
      </CardContent>
      <Divider sx={{ width: '100%', alignSelf: 'center' }} />
      <CardContent>
        {question.type === 'multiple-choice' && (
          <EditMultipleChoiceOptions
            options={(question as MultipleChoiceQuestion).choices}
            setOptions={(choices: Choice[]) => {
              setQuestion({ ...question, choices: choices } as MultipleChoiceQuestion);
            }}
          />
        )}
        <Box className='flex flex-col'>
          <RadioGroup
            className='self-center p-3'
            orientation='horizontal'
            onChange={(e) =>
              setQuestion({
                ...question,
                type: e.target.value as string as 'multiple-choice' | 'short-answer',
              })
            }
          >
            <Radio value='multiple-choice' label='Multiple Choice' />
            <Radio value='short-answer' label='Short Answer' />
          </RadioGroup>

          <Button
            className='m-2 self-center bg-slate-200'
            type='submit'
            variant='soft'
            onClick={() => addQuestion(question)}
          >
            {' '}
            Create
          </Button>
        </Box>
        <MiniOptions editActions={editActions} />
      </CardContent>
    </Card>
  );
}
