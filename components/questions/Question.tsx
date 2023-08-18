"use client";
import { Card, CardContent, Checkbox, Divider, Input, Typography } from "@mui/joy";
import { Radio, RadioGroup,Box } from "@mui/joy";
import MiniOptions from "@/components/questions/MiniOptions";
import Question from "@/interfaces/question/Question";
import MultipleChoiceQuestion from "@/interfaces/question/MultipleChoiceQuestion";
import SingleChoiceQuestion from "@/interfaces/question/SingleChoiceQuestion"
import Choice from "@/interfaces/question/Choice";
import React from "react";
import ShortAnswerQuestion from "@/interfaces/question/ShortAnswerQuestion";


function SingleChoices({choices,handleChange}:{choices:Choice[], handleChange:any}) {
    return <RadioGroup onChange={(e) => handleChange(e)} defaultValue="medium" name="radio-buttons-group">
                { choices.map((option, index) => {
                    return <Radio value={option.id} label={option.text} key={index+1} />;
                })}
        </RadioGroup> ;
}

function MultipleChoices({choices,handleChange}:{choices:Choice[], handleChange:any}) {
    // const hc = (e:React.ChangeEvent<HTMLInputElement>) => {console.log(e.target.value); console.log(e.target.checked)} ;

    return <>
        {
            choices.map((option,index) => {
                return  <Box className="flex mx-10 my-3" key={`${option}+${index}`}>
                <Checkbox value={option.id} onChange={(e) => handleChange(e)} className="px-5" />
                <Typography className="flex-grow">{option.text}</Typography>
              </Box>
            })

        } </>;
}

export default function Question({ qdata, setQuestion }: { qdata: Question, setQuestion: any } ) {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSingleChoiceAnswer = (id:number) => {
    const newdata:SingleChoiceQuestion = {...qdata,answerId:id} as SingleChoiceQuestion;
    setQuestion(newdata)
    // console.log(newdata);
  }

  const handleMultipleChoiceAnswer = (id:number,checked:boolean) => {
    let answers = (qdata as MultipleChoiceQuestion).answerId ;
    answers = answers.filter((answer,index) => answer != id ) ;
    if( checked ){
        answers = [...answers,id] ;
    }
    const newdata:MultipleChoiceQuestion = {...qdata,answerId:answers} as MultipleChoiceQuestion;
    console.log(answers) ;
    setQuestion(newdata) ;
  }

  const handleShortAnswer = (refAns:string) => {
    setQuestion({...qdata,referenceAnswer:refAns} as ShortAnswerQuestion) ;
  }
  return (
    <Card variant="outlined" color="primary" sx={{stroke:"#E2E3FC", width:"95%", margin:"auto"}}>
      <CardContent sx={{ flexDirection: "row", width: "100%", alignContent:"center" }}>
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
        <Typography className="grow" sx={{alignSelf:"center"}}>{qdata.title}</Typography>
        <Typography sx={{alignSelf:"center"}} className="order-last">Points : 5</Typography>
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
      <CardContent>
        {qdata.type === "single-choice" &&
            <SingleChoices choices={(qdata as SingleChoiceQuestion).choices} handleChange={(e:React.ChangeEvent<HTMLInputElement>) => handleSingleChoiceAnswer( Number(e.target.value) ) } /> 
        }
        {qdata.type==="multiple-choice" &&
            <MultipleChoices choices={(qdata as MultipleChoiceQuestion).choices} handleChange={(e:React.ChangeEvent<HTMLInputElement>) => handleMultipleChoiceAnswer( Number(e.target.value), e.target.checked) } />
        }
        {qdata.type==="short-answer" && 
            <Input value={(qdata as ShortAnswerQuestion).referenceAnswer} onChange={(e) => {
                handleShortAnswer(e.target.value) ;
            }} ></Input>
        }
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
    </Card>
  );
}