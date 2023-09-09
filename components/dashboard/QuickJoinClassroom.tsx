import { Input, Typography } from '@mui/joy';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GenericAlert from '../ui/GenericAlert';
import { AlertColor } from '@mui/material';

export default function QuickJoinClassroom() {
  const router = useRouter();
  const [classroomID, setClassroomID] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertColor>('success');
  const [alertText, setAlertText] = useState('Initial Alert Text');

  const handleJoin = async () => {
    console.log('Joining ' + classroomID);
    const res = await fetch(`/api/classroom/join/${classroomID}`, {
      method: 'POST',
    });
    const data = await res.json();
    setAlertText(data.message);
    setAlertType(data.type);
    setShowAlert(true);
  };

  return (
    <>
      <GenericAlert
        show={showAlert}
        setShow={setShowAlert}
        type={alertType}
        text={alertText}
      />
      <div className='flex flex-row space-x-2 py-2 '>
        <Typography className='py-2 text-sm'>
          Classroom Code <span className=' text-slate-200'> | </span>
        </Typography>
        <Input
          className='mx-5 my-auto w-32 '
          value={classroomID}
          onChange={(e) => setClassroomID(e.target.value)}
        />
        <button
          onClick={handleJoin}
          className='focus:shadow-outline my-auto h-8 rounded-md border border-icon-purple px-5 font-medium text-icon-purple transition-colors duration-150 hover:bg-fade-purple '
        >
          Join
        </button>
      </div>
    </>
  );
}
