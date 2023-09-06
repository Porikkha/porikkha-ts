import React, { FC } from 'react';
import { Chip } from '@mui/joy';

interface ExamChipProps {
  startTime: string;
  duration: number; // Duration in integer minutes
}

const ExamChip: FC<ExamChipProps> = ({ startTime, duration }) => {
  const currentTime = new Date();
  const examStartTime = new Date(startTime);
  const examEndTime = new Date(examStartTime.getTime() + duration * 60000);

  let chipLabel = '';
  let chipStyle = '';

  if (currentTime < examStartTime) {
    chipLabel = 'Upcoming';
    chipStyle = 'm-2 bg-orange-100 text-orange-500';
  } else if (currentTime >= examStartTime && currentTime <= examEndTime) {
    chipLabel = 'Ongoing';
    chipStyle = 'm-2 bg-green-100 text-green-500';
  } else {
    chipLabel = 'Past';
    chipStyle = 'm-2 bg-gray-100 text-gray-500';
  }

  return (
    <Chip
      className={chipStyle}
      color='primary'
      onClick={function () {}}
      size='sm'
      variant='soft'
    >
      {chipLabel}
    </Chip>
  );
};

export default ExamChip;
