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
import Link from 'next/link';

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

export default function SubmissionTable({
  rows,
  header,
}: {
  rows: {
    name: string;
    answered: number;
    correct: number;
    marks: number;
    totalMarks: number;
    examID: string;
    studentID: string;
  }[];
  header: string;
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>{header}</StyledTableCell>
            <StyledTableCell>Answered</StyledTableCell>
            <StyledTableCell>Correct</StyledTableCell>
            <StyledTableCell>Marks</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <TableCell component='th' scope='row'>
                <Link href={`/exam/grade/${row.examID}/${row.studentID}`}>
                  {row.name}
                </Link>
              </TableCell>
              <StyledTableCell>{row.answered}</StyledTableCell>
              <StyledTableCell>{row.correct}</StyledTableCell>
              <StyledTableCell>{`${row.marks} / ${row.totalMarks}`}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
