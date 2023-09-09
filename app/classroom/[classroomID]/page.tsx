'use client';

import { Button, Chip, CircularProgress, Divider, Typography } from '@mui/joy';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExamGrid } from '@/components/exam/ExamGrid';
import { SubmissionGrid } from '@/components/submission/SubmissionGrid';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import Image from 'next/image';
import QuickJoin from '@/components/dashboard/QuickJoin';
import Calendar from '@/components/dashboard/Calendar';
import BorderedButton from '@/components/ui/BorderedButton';
import Avatar from '@mui/joy/Avatar';
import ExamCard from '@/components/classroom/ExamCard';
import QuickAdd from '@/components/classroom/QuickAdd';
import EditClassroomModal from '@/components/classroom/EditClassroomModal';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/joy';
import { EditNote } from '@mui/icons-material';
import { dummyClassroom } from '@/interfaces/Classroom';
import DiscussionCard from '@/components/classroom/DiscussionCard';
import GenericAlert from '@/components/ui/GenericAlert';
import { AlertColor } from '@mui/material';
import InviteModal from '@/components/classroom/InviteModal';
import EditDiscussionCardModal from '@/components/classroom/EditDiscussionCardModal';

export default function Page({ params }: { params: { classroomID: string } }) {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [classroomName, setClassroomName] = useState('Classroom Name');
  const [classroomDesc, setClassroomDesc] = useState('Classroom Description');
  const [classroomID, setClassroomID] = useState('');
  const [isCreator, setIsCreator] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertColor>('success');
  const [alertText, setAlertText] = useState('Initial Alert Text');
  const [exams, setExams] = useState([]);
  const [showCreateThread,setShowCreateThread] = useState(false) ;
  const values = { classroomName, classroomDesc, classroomID: params.classroomID };
  const setters = {
    setClassroomName,
    setClassroomDesc,
    setAlertType,
    setAlertText,
    setShowAlert,
  };

  const fetchClassroomData = async () => {
    const res = await fetch(`/api/classroom/${params.classroomID}`);
    const data = await res.json();
    if (data.status === 200) {
      setClassroomName(data.classroom.name);
      setClassroomDesc(data.classroom.description);
      setClassroomID(data.classroom.classroomID);
      setExams(data.classroom.exams);
      setIsCreator(data.isCreator);
    } else {
      console.log('Something bad happened while fetching classroom data: ', data.message);
      setAlertType(data.type);
      setAlertText(data.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    fetchClassroomData();
  }, []);
  return (
    <>
      <Sidebar />
      <section className='w-full pl-16'>
        <GenericAlert
          show={showAlert}
          setShow={setShowAlert}
          type={alertType}
          text={alertText}
        />
        {/* ---------Added by shuaib---------*/}
        <EditClassroomModal
          open={open}
          setOpen={setOpen}
          values={values}
          setters={setters}
        />
        <InviteModal
          open={openInvite}
          setOpen={setOpenInvite}
          values={values}
          setters={setters}
        />
        {/* ------------------*/}
        <div className='grid grid-cols-7 gap-2 p-5'>
          <div className='col-span-5 h-screen rounded-md bg-light-gray p-5'>
            <div className='flex'>
              <Typography className='pb-2 text-3xl font-semibold'>
                {classroomName}
              </Typography>
              {/* ---------Added by shuaib---------*/}
              <IconButton
                sx={{ color: 'var(--clr-purple-1)' }}
                onClick={() => setOpen(true)}
              >
                <EditNote />
              </IconButton>
              {/* ------------------*/}
              <div className='float-right ml-auto'>
                <BorderedButton
                  onClick={() => {
                    console.log('Hello');
                  }}
                >
                  Leave Room
                </BorderedButton>
              </div>
            </div>
            <div>
              <Typography className='py-2 text-xl font-medium'>
                Join Code : {classroomID}
              </Typography>
            </div>
            {/* --------Added by shuaib----------*/}
            <div>
              <Typography className='py-2 text-base font-medium'>
                {classroomDesc}
              </Typography>
            </div>
            {isCreator && <QuickAdd classroomID={classroomID} />}
            {/* ------------------ */}
            <Divider className='bg-slate-200' />
            <div className='my-2 flex gap-1'>
              <Avatar size='sm'>JG</Avatar>
              <Avatar size='sm'>RM</Avatar>
              <Avatar size='sm'>SB</Avatar>
              <Avatar size='sm'>+9</Avatar>

              <Chip
                className='float-right ml-auto'
                color='success'
                onClick={() => {
                  setOpenInvite(true);
                }}
                variant='outlined'
              >
                + Invite
              </Chip>
            </div>
            <div className='my-10'>
              <EditDiscussionCardModal  open={showCreateThread} onClose={() => setShowCreateThread(!showCreateThread)}/>
              <BorderedButton onClick={() => setShowCreateThread(true)}>
                Create Thread
              </BorderedButton>
              <DiscussionCard />
            </div>
          </div>
          <div className='col-span-2 h-screen bg-light-gray p-3'>
            <Typography className='p-2 text-xl font-medium'>Next Exams</Typography>
            {exams.map((exam) => (
              <ExamCard exam={exam} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
