import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name: string, answered: number, correct: number, marks: number) {
  return { name, answered, correct, marks };
}

export default function CustomizedTables({ examID }: { examID: string }) {
  const [rows, setRows] = useState([createData('Deuce', 0, 0, 0)]);

  const fetchSubmissions = async () => {
    const response = await fetch('http://localhost:3000/api/exams/results/' + examID, {
      method: 'GET',
    });
    const data = await response.json();
    console.log("🚀 ~ file: SubmissionTable.tsx:44 ~ fetchSubmissions ~ data:", data);
    setRows([]);
    data.rows.forEach((sub: any) => {
      // first clear all previous rows
      setRows((prev) => [
        ...prev,
        createData(sub.student.username, 0, 0, sub.achievedMarks),
      ]);
    });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Answered</StyledTableCell>
            <StyledTableCell>Correct</StyledTableCell>
            <StyledTableCell>Marks</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.answered}</StyledTableCell>
              <StyledTableCell>{row.correct}</StyledTableCell>
              <StyledTableCell>{row.marks}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
