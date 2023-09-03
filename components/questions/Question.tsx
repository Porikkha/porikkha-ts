'use client';
import { Card, CardContent, Checkbox, Divider, Input, Typography } from '@mui/joy';
import { Radio, RadioGroup, Box } from '@mui/joy';
import Question from '@/interfaces/question/Question';
import MultipleChoiceQuestion from '@/interfaces/question/MultipleChoiceQuestion';
import SingleChoiceQuestion from '@/interfaces/question/SingleChoiceQuestion';
import React from 'react';
import {
  SingleChoiceAnswer,
  ShortAnswerQuestion,
  Choice,
  MultipleChoiceAnswer,
} from '@/interfaces';
import { ContactlessOutlined } from '@mui/icons-material';

export function SingleChoices({
  choices,
  answer,
  handleAnswerChange,
}: {
  answer?: SingleChoiceAnswer['answer'];
  choices: Choice[];
  handleAnswerChange: any;
}) {
  return (
    <RadioGroup
      onChange={(e) => handleAnswerChange(e)}
      defaultValue='medium'
      name='radio-buttons-group'
      className='px-10 py-3 flex flex-col space-y-5'
    >
      {choices.map((option, index) => {
        return (
          <Radio
            value={option.id}
            label={option.text}
            key={index + 1}
            checked={answer !== undefined && option.id === answer}
          />
        );
      })}
    </RadioGroup>
  );
}

export function MultipleChoices({
  choices,
  answer,
  handleAnswerChange,
}: {
  choices: Choice[];
  answer: MultipleChoiceAnswer['answer'];
  handleAnswerChange: any;
}) {
  const getChecked = () => {
    let checked = new Array<boolean>(choices.length + 1).fill(false);
    answer.forEach((id: number) => {
      checked[id] = true;
    });
    return checked;
  };
  const checked = getChecked();
  return (
    <>
      {choices.map((option, index) => {
        return (
          <Box className='mx-5 my-3 flex' key={`${option}+${index}`}>
            <Checkbox
              value={option.id}
              onChange={(e) => handleAnswerChange(e)}
              checked={checked[option.id]} // checked[option.id]===true}
              className='px-5'
            />
            <Typography className='flex-grow'>{option.text}</Typography>
          </Box>
        );
      })}{' '}
    </>
  );
}

export const handleSingleChoiceAnswer = (
  id: number,
  qdata: SingleChoiceQuestion,
  setQuestion: any
) => {
  const newdata: SingleChoiceQuestion = {
    ...qdata,
    answer: id,
  } as SingleChoiceQuestion;
  setQuestion(newdata);
};

export const handleMultipleChoiceAnswer = (
  id: number,
  checked: boolean,
  qdata: MultipleChoiceQuestion,
  setQuestion: any
) => {
  let answers = (qdata as MultipleChoiceQuestion).answer;
  answers = answers.filter((answer) => answer != id);
  if (checked) {
    answers = [...(answers as number[]), id];
  }
  const newdata: MultipleChoiceQuestion = {
    ...qdata,
    answer: answers,
  } as MultipleChoiceQuestion;
  setQuestion(newdata);
};
export const handleShortAnswer = (
  refAns: string,
  qdata: ShortAnswerQuestion,
  setQuestion: any
) => {
  setQuestion({ ...qdata, answer: refAns } as ShortAnswerQuestion);
};
export function QuestionContent({
  qdata,
  setQuestion,
}: {
  qdata: Question;
  setQuestion: any;
}) {
  return (
    <>
      <CardContent sx={{ flexDirection: 'row', width: '100%', alignContent: 'center' }}>
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
        <Typography className='grow' sx={{ alignSelf: 'center' }}>
          {qdata.title}
        </Typography>
        <Typography sx={{ alignSelf: 'center' }} className='order-last'>
          Points : 5
        </Typography>
      </CardContent>
      <Divider sx={{ width: '100%', alignSelf: 'center' }} />
      <CardContent>
        {qdata.type === 'single-choice' && (
          <SingleChoices
            choices={(qdata as SingleChoiceQuestion).choices}
            answer={(qdata as SingleChoiceQuestion).answer}
            handleAnswerChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSingleChoiceAnswer(
                Number(e.target.value),
                qdata as SingleChoiceQuestion,
                setQuestion
              )
            }
          />
        )}
        {qdata.type === 'multiple-choice' && (
          <MultipleChoices
            choices={(qdata as MultipleChoiceQuestion).choices}
            answer={(qdata as MultipleChoiceQuestion).answer}
            handleAnswerChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleMultipleChoiceAnswer(
                Number(e.target.value),
                e.target.checked,
                qdata as MultipleChoiceQuestion,
                setQuestion
              )
            }
          />
        )}
        {qdata.type === 'short-answer' && (
          <Input
            className='mx-10 my-3'
            value={(qdata as ShortAnswerQuestion).answer}
            onChange={(e) => {
              handleShortAnswer(
                e.target.value,
                qdata as ShortAnswerQuestion,
                setQuestion
              );
            }}
          ></Input>
        )}
      </CardContent>
    </>
  );
}

export default function Question({
  qdata,
  setQuestion,
}: {
  qdata: Question;
  setQuestion: any;
}) {
  return (
    <Card
      className='my-3'
      variant='outlined'
      color='primary'
      sx={{ stroke: '#E2E3FC', margin: 'auto' }}
    >
      <QuestionContent qdata={qdata} setQuestion={setQuestion} />
    </Card>
  );
}
