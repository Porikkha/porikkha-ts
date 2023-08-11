"use client";
import { Card, CardContent } from "@mui/material";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import EditMultipleChoice from "@/components/questions/EditMultipleChoice"
import { dummyQuestions } from "@/interfaces/Question";

export default function Page() {
  return (
    <>
      <EditMultipleChoice qdata={dummyQuestions[0]} addQuestion={null}/>
    </>
  );
}
