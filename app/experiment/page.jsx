"use client";
import { Card, CardContent } from "@mui/material";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";

import EditMultipleChoice from "@/components/questions/EditMultipleChoice"

const qdata = {
  NUMBER : 1,
  QUESTION: "What is the capital of Dubai?",
  OPTIONS: ["Abu Dhabi", "Dhaka", "Delhi", "Kabul"],
}
export default function Page() {
  return (
    <>
      <EditMultipleChoice qdata={qdata}/>
    </>
  );
}
