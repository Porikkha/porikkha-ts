"use client";
//import { Card, CardContent, Typography } from "@mui/material";
import { Card, CardContent, Divider, Typography } from "@mui/joy";
import { Radio, RadioGroup,Box } from "@mui/joy";
import MiniOptions from "@/components/questions/MiniOptions";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export default function MultipleChoice({ qdata }) {

  const handleChange = (e) => {

  };

  return (
    <Card variant="outlined" color="primary" sx={{stroke:"#E2E3FC", margin:"auto"}}>
      <CardContent sx={{ flexDirection: "row", width: "95%", alignContent:"center" }}>
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
        <Typography className="grow" sx={{alignSelf:"center"}}>{qdata.QUESTION}</Typography>
        <Typography sx={{alignSelf:"center"}} className="order-last">Points : 5</Typography>
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
      <CardContent className="pl-10">
        <RadioGroup onChange={(e) => handleChange()} defaultValue="medium" name="radio-buttons-group">
          {qdata.OPTIONS.map((option, index) => {
            return <Radio value={index + 1} label={option} key={index+1} />;
          })}
        </RadioGroup>
      </CardContent>
      <Divider sx={{ width: "100%", alignSelf: "center" }} />
      <MiniOptions/>


    </Card>
  );
}