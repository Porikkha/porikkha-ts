"use client";
//import { Card, CardContent, Typography } from "@mui/material";
import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Typography,
} from "@mui/joy";
import { Radio, RadioGroup, Box, Input, Label, Button } from "@mui/joy";
import { useState } from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
export function EditMultipleChoiceOptions({ options, setOptions }) {
  //const [opt, setOpt] = useState(options);
  const [newopt, setNewopt] = useState("");

  const deleteOption = (indexToRemove) => {
    const nopt = options.filter((item, index) => index !== indexToRemove);
    setOptions(nopt);
  };
  const addOption = (option) => {
    setOptions([...options, option]);
  };
  return (
    <>
      <CardContent className="mb-5">
        {options.map((option, index) => {
          return (
            <Box className="flex mx-10 my-3" key={`${option}+${index}`}>
              <Checkbox className="px-5" />
              <Typography className="flex-grow">{option}</Typography>
              <DeleteOutlinedIcon
                className="text-black hover:text-red-400"
                onClick={() => deleteOption(index)}
              />
            </Box>
          );
        })}
      </CardContent>
      <Box sx={{ display: "flex" }} className="mx-10 mb-5">
        <Typography className="py-2 px-4 align-middle">New Option:</Typography>
        <Input
          className="flex-grow"
          value={newopt}
          onChange={(e) => setNewopt(e.target.value)}
        ></Input>
        <IconButton
          className="mx-2 bg-slate-200/70 hover:bg-slate-200"
          onClick={() => addOption(newopt)}
        >
          <Add />
        </IconButton>
      </Box>
    </>
  );
}

export default function EditMultipleChoice({ qdata, addQuestion }) {
  const [question, setQuestion] = useState(qdata);

  const handleChange = (e) => {};

  const updateQuestionTitle = (e) => {
    console.log("called me");
    setQuestion({ ...question, QUESTION: e.target.value });
  };

  return (
    <Card
      variant="outlined"
      color="primary"
      sx={{ stroke: "#E2E3FC", margin: "auto" }}
    >
      <CardContent
        sx={{
          flexDirection: "row",
          width: "100%",
          alignContent: "center",
        }}
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
          <Typography>{qdata.NUMBER}</Typography>
        </Box>
        {/* <Typography sx={{alignSelf:"center"}}>{qdata.QUESTION}</Typography> */}
        <Input
          className="flex-grow"
          value={question.QUESTION}
          onChange={(e) => updateQuestionTitle(e)}
        />

        <Box sx={{ display: "flex", width: "18%", marginLeft: "auto" }}>
          <Typography className="mr-2" sx={{ alignSelf: "center" }}>
            Points:
          </Typography>
          <Input
            value={question.POINTS}
            onChange={(e) => {
              setQuestion({
                ...question,
                POINTS: e.target.value,
              });
            }}
          />
        </Box>
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
      <CardContent>
        {question.TYPE === "MCQ" && (
          <EditMultipleChoiceOptions
            options={question.OPTIONS}
            setOptions={(option) => {
              setQuestion({ ...question, OPTIONS: option });
            }}
          />
        )}
        <Box className="flex flex-col">
          <RadioGroup
            className="self-center p-3"
            orientation="horizontal"
            onChange={(e) => setQuestion({ ...question, TYPE: e.target.value })}
          >
            <Radio value="MCQ" label="Multiple Choice" />
            <Radio value="Short" label="Short Answer" />
          </RadioGroup>

          <Button
            className="bg-slate-200 m-2 self-center"
            type="submit"
            variant="soft"
            onClick={() => addQuestion(question)}
          >
            {" "}
            Create
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
