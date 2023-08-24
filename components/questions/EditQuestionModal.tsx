'use client';
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Input,
  ModalDialog,
  Typography,
  Modal,
  Button,
} from '@mui/joy';
import { Radio, RadioGroup, Box } from '@mui/joy';
import MiniOptions from '@/components/questions/MiniOptions';
import Question from '@/interfaces/question/Question';
import MultipleChoiceQuestion from '@/interfaces/question/MultipleChoiceQuestion';
import Choice from '@/interfaces/question/Choice';
import React, { useState } from 'react';
import SingleChoiceQuestion from '@/interfaces/question/SingleChoiceQuestion';
import ShortAnswerQuestion from '@/interfaces/question/ShortAnswerQuestion';
import { Add, DeleteOutlined } from '@mui/icons-material';
import {
  QuestionContent,
  handleMultipleChoiceAnswer,
  handleShortAnswer,
  handleSingleChoiceAnswer,
} from './Question';
import { MultipleChoiceAnswer } from '@/interfaces';

function EditSingleChoices({
  choices,
  setChoices,
  answer,
  handleAnswerChange,
}: {
  choices: Choice[];
  setChoices: any;
  answer: SingleChoiceQuestion['answer'];
  handleAnswerChange: any;
}) {
  const [newopt, setNewopt] = useState<Choice>({ text: '', id: 0 });

  const setIndex = (choices: Choice[]) => {
    const nc = choices.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    console.log(nc);
    return nc;
  };
  const deleteOption = (indexToRemove: number) => {
    let nopt = choices.filter((item, index) => index !== indexToRemove);
    setChoices(setIndex(nopt));
  };
  const addOption = (option: Choice) => {
    setChoices(setIndex([...choices, option]));
  };

  return (
    <>
      <CardContent className='mb-5'>
        <RadioGroup
          onChange={(e) => handleAnswerChange(e)}
          defaultValue='medium'
          name='radio-buttons-group'
        >
          {choices?.map((option, index) => {
            return (
              <Box
                sx={{ display: 'flex', flexGrow: '1', width: '100%' }}
                key={`${option.id} ${option.text}`}
              >
                <Radio
                  sx={{ flexGrow: '1' }}
                  value={option.id}
                  label={option.text}
                  checked={answer !== undefined && option.id === answer}
                />
                <DeleteOutlined
                  className='text-black hover:text-red-400'
                  onClick={() => deleteOption(index)}
                />
              </Box>
            );
          })}
        </RadioGroup>
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

function EditMultipleChoices({
  choices,
  setChoices,
  answer,
  handleAnswerChange,
}: {
  choices: Choice[];
  setChoices: any;
  answer: MultipleChoiceAnswer['answer'];
  handleAnswerChange: any;
}) {
  const [newopt, setNewopt] = useState<Choice>({ text: '', id: 0 });

  const setIndex = (choices: Choice[]) => {
    const nc = choices.map((item, index) => {
      item.id = index + 1;
      return item;
    });
    console.log(nc);
    return nc;
  };
  const deleteOption = (indexToRemove: number) => {
    let nopt = choices.filter((item, index) => index !== indexToRemove);
    setChoices(setIndex(nopt));
  };
  const addOption = (option: Choice) => {
    setChoices(setIndex([...choices, option]));
  };
  const getChecked = () => {
    let checked = new Array<boolean>(choices.length + 1).fill(false);
    answer?.forEach((id: number) => {
      checked[id] = true;
    });
    return checked;
  };
  const checked = getChecked();
  return (
    <>
      <CardContent className='mb-5'>
        {choices?.map((option, index) => {
          return (
            <Box className='mx-10 my-3 flex' key={`${option}+${index}`}>
              <Checkbox
                value={option.id}
                onChange={(e) => handleAnswerChange(e)}
                checked={checked[option.id]}
                className='px-5'
              />
              <Typography className='flex-grow'>{option.text}</Typography>
              <DeleteOutlined
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
  editActions,
  setQuestion,
  edit,
}: {
  edit?: boolean;
  qdata: Question;
  editActions: any;
  setQuestion: any;
}) {
  const [editquestion, setEditQuestion] = useState(edit === undefined ? false : true);
  return (
    <>
      <Card
        key={`editQuestionPreview ${qdata.id}`}
        variant='outlined'
        color='primary'
        sx={{ stroke: '#E2E3FC', width: '95%', margin: 'auto' }}
      >
        <QuestionContent qdata={qdata} setQuestion={setQuestion} />
        <Divider sx={{ width: '100%', alignSelf: 'center' }} />
        <MiniOptions
          editActions={{
            ...editActions,
            editQuestion: () => setEditQuestion(!editquestion),
          }}
        />
      </Card>
      <Modal open={editquestion} onClose={() => setEditQuestion(false)}>
        <ModalDialog>
          <Card
            key={`editQuestion ${qdata.id}`}
            variant='outlined'
            color='primary'
            sx={{ stroke: '#E2E3FC', margin: 'auto' }}
          >
            <CardContent
              sx={{
                flexDirection: 'row',
                width: '95%',
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
              <Box sx={{ display: 'flex', flexGrow: '1', alignItems: 'center' }}>
                <Input
                  value={qdata.title}
                  onChange={(e) => {
                    setQuestion({
                      ...qdata,
                      title: e.target.value as string,
                    } as Question);
                  }}
                  sx={{ flexGrow: '1' }}
                />
              </Box>
              <Box sx={{ display: 'flex', width: '18%', marginLeft: 'auto' }}>
                <Typography className='mr-2' sx={{ alignSelf: 'center' }}>
                  Points:
                </Typography>
                <Input
                  value={qdata.points}
                  onChange={(e) => {
                    setQuestion({
                      ...qdata,
                      points: e.target.value as unknown as number,
                    });
                  }}
                />
              </Box>
            </CardContent>
            <Divider sx={{ width: '100%', alignSelf: 'center' }} />
            <CardContent className='ml-10'>
              {qdata.type === 'multiple-choice' && (
                <EditMultipleChoices
                  key={`MultipleChoice${qdata.id}`}
                  choices={(qdata as MultipleChoiceQuestion).choices}
                  setChoices={(choices: Choice[]) => {
                    setQuestion({ ...qdata, choices: choices });
                  }}
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
              {qdata.type === 'single-choice' && (
                <EditSingleChoices
                  key={`SingleChoice${qdata.id}`}
                  choices={(qdata as SingleChoiceQuestion).choices}
                  setChoices={(choices: Choice[]) => {
                    setQuestion({ ...qdata, choices: choices });
                  }}
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
              {qdata.type === 'short-answer' && (
                <Input
                  value={(qdata as ShortAnswerQuestion).answer}
                  onChange={(e) => {
                    handleShortAnswer(
                      e.target.value,
                      qdata as ShortAnswerQuestion,
                      setQuestion
                    );
                  }}
                  disabled={!editquestion}
                ></Input>
              )}
            </CardContent>
            <Divider sx={{ width: '100%', alignSelf: 'center' }} />
            <RadioGroup
              className='self-center p-3'
              orientation='horizontal'
              value={qdata.type}
              onChange={(e) => {
                const newQuestion = {
                  ...qdata,
                  type: e.target.value as string as
                    | 'single-choice'
                    | 'multiple-choice'
                    | 'short-answer',
                };
                if (newQuestion.type === 'multiple-choice')
                  setQuestion(newQuestion as MultipleChoiceQuestion);
                else if (newQuestion.type === 'single-choice')
                  setQuestion(newQuestion as SingleChoiceQuestion);
                else if (newQuestion.type === 'short-answer')
                  setQuestion(newQuestion as ShortAnswerQuestion);
              }}
            >
              <Radio value='multiple-choice' label='Multiple Choice' />
              <Radio value='single-choice' label='Single Choice' />
              <Radio value='short-answer' label='Short Answer' />
            </RadioGroup>
            <Button
              className='m-2 self-center bg-slate-200'
              type='submit'
              variant='soft'
              onClick={() => setEditQuestion(false)}
            >
              Done
            </Button>
          </Card>
        </ModalDialog>
      </Modal>
    </>
  );
}
