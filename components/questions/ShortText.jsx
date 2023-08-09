"use client";
//import { Card, CardContent, Typography } from "@mui/material";
import { Card, CardContent, Divider, Typography } from "@mui/joy";
import { Radio, RadioGroup, Box, Input } from "@mui/joy";
// import { useState } from "react";

export default function ShortText({ qdata }) {
  // const [answer,setAnswer] = useState('') ;

  const handleChange = (e) => {};
  return (
    <Card
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
          <Typography>{qdata.NUMBER}</Typography>
        </Box>
        <Typography sx={{ alignSelf: "center" }}>{qdata.QUESTION}</Typography>
      </CardContent>
      <Divider sx={{ width: "90%", alignSelf: "center" }} />
      {/* <Input value={answer} onChange={(e) => { console.log(e.target.value); setAnswer(e.target.value)} }/> */}
      <Input></Input>
    </Card>
  );
}