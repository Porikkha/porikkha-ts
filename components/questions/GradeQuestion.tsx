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
  Answer,
  ShortAnswerAnswer,
} from '@/interfaces';
import { ContactlessOutlined } from '@mui/icons-material';
import { AiOutlineCheck } from 'react-icons/ai';

export function GradeSingleChoices({
  choices,
  actualAnswer,
  studentAnswer,
}: {
  actualAnswer?: SingleChoiceAnswer['answer'];
  studentAnswer?: SingleChoiceAnswer['answer'];
  choices: Choice[];
}) {
  return (
    <RadioGroup
      //   onChange={(e) => handleAnswerChange(e)}
      defaultValue='medium'
      name='radio-buttons-group'
      className='flex flex-col space-y-5 px-10 py-3'
    >
      {choices.map((option, index) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Radio
              value={option.id}
              label={option.text}
              key={index + 1}
              checked={studentAnswer !== undefined && option.id === studentAnswer}
            />
            {actualAnswer !== undefined && option.id === actualAnswer && (
              <AiOutlineCheck
                style={{
                  color: 'var(--clr-green)',
                  marginLeft: '15px',
                  fontSize: '1.5rem',
                }}
              />
            )}
          </Box>
        );
      })}
    </RadioGroup>
  );
}

export function GradeMultipleChoices({
  choices,
  actualAnswer,
  studentAnswer,
}: {
  choices: Choice[];
  actualAnswer?: MultipleChoiceAnswer['answer'];
  studentAnswer?: MultipleChoiceAnswer['answer'];
}) {
  const getChecked = (answer: MultipleChoiceAnswer['answer']) => {
    let checked = new Array<boolean>(choices.length + 1).fill(false);
    answer.forEach((id: number) => {
      checked[id] = true;
    });
    return checked;
  };
  return (
    <>
      {choices.map((option, index) => {
        return (
          <Box className='mx-5 my-3 flex' key={`${option}+${index}`}>
            <Checkbox
              value={option.id}
              //   onChange={(e) => handleAnswerChange(e)}
              checked={getChecked(studentAnswer!)[option.id]} // checked[option.id]===true}
              className='px-5'
            />
            <Typography className='flex-grow'>{option.text}</Typography>
            {actualAnswer !== undefined && getChecked(actualAnswer)[option.id] && (
              <AiOutlineCheck
                style={{
                  color: 'var(--clr-green)',
                  marginLeft: '15px',
                  fontSize: '1.5rem',
                }}
              />
            )}
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
export function GradeQuestionContent({
  qdata,
  adata,
}: {
  qdata: Question;
  adata: Answer;
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
          Points : {qdata.points}
        </Typography>
      </CardContent>
      <Divider sx={{ width: '100%', alignSelf: 'center' }} />
      <CardContent>
        {qdata.type === 'single-choice' && (
          <GradeSingleChoices
            choices={(qdata as SingleChoiceQuestion).choices}
            actualAnswer={(qdata as SingleChoiceQuestion).answer}
            studentAnswer={(adata as SingleChoiceAnswer).answer}
          />
        )}
        {qdata.type === 'multiple-choice' && (
          <GradeMultipleChoices
            choices={(qdata as MultipleChoiceQuestion).choices}
            actualAnswer={(qdata as MultipleChoiceQuestion).answer}
            studentAnswer={(adata as MultipleChoiceAnswer).answer}
          />
        )}
        {qdata.type === 'short-answer' && (
          <>
            <Input
              className='mx-10 my-3'
              value={(qdata as ShortAnswerQuestion).answer}
              // onChange={(e) => {
              //   handleShortAnswer(
              // e.target.value,
              // qdata as ShortAnswerQuestion,
              // setQuestion
              //   );
              // }}
            ></Input>
            <Typography sx={{ marginLeft:"auto",color: 'var(--clr-green)' }}>
              {(adata as ShortAnswerAnswer).answer}
            </Typography>
          </>
        )}
      </CardContent>
    </>
  );
}

export default function GradeQuestion({
  qdata,
  adata,
  setScore,
  view,
}: {
  qdata: Question;
  adata: Answer;
  setScore: any;
  view: any;
}) {

  const [curScore, setCurScore] = React.useState(adata.score);

  return (
    <Card
    className="py-10 mx-auto"
      variant='outlined'
      color='primary'
      sx={{ stroke: '#E2E3FC', }}
    >
      <GradeQuestionContent qdata={qdata} adata={adata} />
      <Box sx={{display:"flex",flexDirection:"row",width:"125px",marginLeft:"auto"}}>
        {view ? <p> Score : {curScore} </p> : 
        <>
                <Typography>Score:</Typography>
          <Input
            value={curScore}
            onChange={(e) => {
              setCurScore( Number(e.target.value)) ;
              setScore(e.target.value);
            }}
          />
        </>
        }
      </Box>
    </Card>
  );
}
