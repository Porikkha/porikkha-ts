import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; label: string }
) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className='m-5'
    >
      <CircularProgress
        variant='determinate'
        {...props}
        thickness={3}
        size={150}
        style={{ color: '#1979e6' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
          fontSize={30}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
      <Typography variant='h6' align='center'>
        {props.label}
      </Typography>
    </Box>
  );
}

export default function CustomCircularProgress({ value }: { value: number }) {
  return <CircularProgressWithLabel value={value} label={'label'} />;
}
