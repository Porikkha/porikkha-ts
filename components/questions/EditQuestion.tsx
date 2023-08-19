"use client";
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Input,
  Typography,
} from "@mui/joy";
import { Radio, RadioGroup, Box } from "@mui/joy";
import MiniOptions from "@/components/questions/MiniOptions";
import Question from "@/interfaces/question/Question";
import MultipleChoiceQuestion from "@/interfaces/question/MultipleChoiceQuestion";
import Choice from "@/interfaces/question/Choice";
import React, { useState } from "react";
import SingleChoiceQuestion from "@/interfaces/question/SingleChoiceQuestion";
import ShortAnswerQuestion from "@/interfaces/question/ShortAnswerQuestion";
import { Add, DeleteOutlined } from "@mui/icons-material";

function SingleChoices({
  choices,
  setChoices,
  handleChange,
  edit,
}: {
  choices: Choice[];
  setChoices: any;
  handleChange: any;
  edit: boolean;
}) {
  const [newopt, setNewopt] = useState<Choice>({ text: "", id: 0 });

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
      <CardContent className="mb-5" >
        <RadioGroup
          onChange={(e) => handleChange(e)}
          defaultValue="medium"
          name="radio-buttons-group"
        >
          {choices.map((option, index) => {
            return (
              <Box sx={{ display: "flex", flexGrow: "1", width: "100%"}} key={`${option.id} ${option.text}`}>
                <Radio
                  sx={{ flexGrow: "1" }}
                  value={option.id}
                  label={option.text}
                />
                {edit && (
                  <DeleteOutlined
                    className="text-black hover:text-red-400"
                    onClick={() => deleteOption(index)}
                  />
                )}
              </Box>
            );
          })}
        </RadioGroup>
      </CardContent>

      {edit && (
        <Box sx={{ display: "flex" }} className="mx-10 mb-5">
          <Typography className="py-2 px-4 align-middle">
            New Option:
          </Typography>
          <Input
            className="flex-grow"
            value={newopt.text}
            onChange={(e) => setNewopt({ ...newopt, text: e.target.value })}
          ></Input>
          <IconButton
            className="mx-2 bg-slate-200/70 hover:bg-slate-200"
            onClick={() => addOption(newopt)}
          >
            <Add />
          </IconButton>
        </Box>
      )}
    </>
  );
}

function MultipleChoices({
  choices,
  setChoices,
  handleChange,
  edit,
}: {
  choices: Choice[];
  setChoices: any;
  handleChange: any;
  edit: boolean;
}) {
  const [newopt, setNewopt] = useState<Choice>({ text: "", id: 0 });

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
      <CardContent className="mb-5">
        {choices.map((option, index) => {
          return (
            <Box className="flex mx-10 my-3" key={`${option}+${index}`}>
              <Checkbox
                value={option.id}
                onChange={(e) => handleChange(e)}
                className="px-5"
              />
              <Typography className="flex-grow">{option.text}</Typography>
              {edit && (
                <DeleteOutlined
                  className="text-black hover:text-red-400"
                  onClick={() => deleteOption(index)}
                />
              )}
            </Box>
          );
        })}
      </CardContent>
      {edit && (
        <Box sx={{ display: "flex" }} className="mx-10 mb-5">
          <Typography className="py-2 px-4 align-middle">
            New Option:
          </Typography>
          <Input
            className="flex-grow"
            value={newopt.text}
            onChange={(e) => setNewopt({ ...newopt, text: e.target.value })}
          ></Input>
          <IconButton
            className="mx-2 bg-slate-200/70 hover:bg-slate-200"
            onClick={() => addOption(newopt)}
          >
            <Add />
          </IconButton>
        </Box>
      )}
    </>
  );
}

export default function EditQuestion({
  qdata,
  editActions,
  setQuestion,
}: {
  qdata: Question;
  editActions: any;
  setQuestion: any;
}) {
  const [edit, setEdit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleSingleChoiceAnswer = (id: number) => {
    const newdata: SingleChoiceQuestion = {
      ...qdata,
      answerId: id,
    } as SingleChoiceQuestion;
    setQuestion(newdata);
    // console.log(newdata);
  };
  const handleMultipleChoiceAnswer = (id: number, checked: boolean) => {
    let answers = (qdata as MultipleChoiceQuestion).answerId;
    answers = answers.filter((answer, index) => answer != id);
    if (checked) {
      answers = [...answers, id];
    }
    const newdata: MultipleChoiceQuestion = {
      ...qdata,
      answerId: answers,
    } as MultipleChoiceQuestion;
    console.log(answers);
    setQuestion(newdata);
  };

  const handleShortAnswer = (refAns: string) => {
    setQuestion({ ...qdata, referenceAnswer: refAns } as ShortAnswerQuestion);
  };

  return (
    <Card
      key = {`editQuestion ${qdata.id} ${qdata.type}`}
      variant="outlined"
      color="primary"
      sx={{ stroke: "#E2E3FC", margin: "auto" }}
    >
      <CardContent
        sx={{ flexDirection: "row", width: "95%", alignContent: "center" }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            backgroundColor: "#E2E3FC", // Purple color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff", // Text color for the content inside the box
            fontWeight: "bold", // Example: Applying a bold font weight to the text
            borderRadius: "5px",
          }}
        >
          <Typography>{qdata.id}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexGrow:"1", alignItems: "center" }} > 
          {edit ? (
            <Input
              value={qdata.title}
              onChange={(e) => { setQuestion({ ...qdata,title: e.target.value as string} as Question); } }
            sx={{ flexGrow: "1" }}
            />
          ) : (
            <Typography sx={{ alignSelf: "center", justifySelf: "center" }}>
              {qdata.title}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", width: "18%", marginLeft: "auto" }}>
          <Typography className="mr-2" sx={{ alignSelf: "center" }}>
            Points:
          </Typography>
          {edit ? (
            <Input
              value={qdata.points}
              onChange={(e) => {
                setQuestion({
                  ...qdata,
                  points: e.target.value as unknown as number,
                });
              }}
            />
          ) : (
            <Typography sx={{ alignSelf: "center" }} className="order-last">
              {qdata.points}
            </Typography>
          )}
        </Box>
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
      <CardContent className="ml-10">
        {qdata.type === "multiple-choice" && (
          <MultipleChoices
            key={`MultipleChoice${qdata.id}${qdata.title}`}
            choices={(qdata as MultipleChoiceQuestion).choices}
            setChoices={(choices: Choice[]) => {
              setQuestion({ ...qdata, choices: choices });
            }}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleMultipleChoiceAnswer(
                Number(e.target.value),
                e.target.checked
              )
            }
            edit={edit}
          />
        )}
        {qdata.type === "single-choice" && (
          <SingleChoices
            key={`SingleChoice${qdata.id}${qdata.title}`}
            choices={(qdata as SingleChoiceQuestion).choices}
            setChoices={(choices: Choice[]) => {
              setQuestion({ ...qdata, choices: choices });
            }}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSingleChoiceAnswer(Number(e.target.value))
            }
            edit={edit}
          />
        )}
        {qdata.type === "short-answer" && (
          <Input
            value={(qdata as ShortAnswerQuestion).referenceAnswer}
            onChange={(e) => {
              handleShortAnswer(e.target.value);
            }}
            disabled={!edit}
          ></Input>
        )}
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
	  {edit && 
	  <RadioGroup
            className="self-center p-3"
            orientation="horizontal"
            value={qdata.type}
            onChange={(e) => setQuestion({ ...qdata, type: (e.target.value as string as "single-choice" | "multiple-choice" | "short-answer") })}
          >
            <Radio value="multiple-choice" label="Multiple Choice" />
            <Radio value="single-choice" label="Single Choice" />
            <Radio value="short-answer" label="Short Answer" />
      </RadioGroup> 
	}
      <MiniOptions
        editActions={{ ...editActions, editQuestion: () => setEdit(!edit) }}
      />
    </Card>
  );
}
