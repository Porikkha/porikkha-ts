import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  LuBarChart,
  LuBarChart4,
  LuHome,
  LuLogOut,
  LuSettings,
  LuUser,
} from 'react-icons/lu';

import { BiAddToQueue } from 'react-icons/bi';
import ExamInterface from '@/interfaces/Exam';
import { useSession } from 'next-auth/react';
import { addMinutes } from '@/utils/timeUtils';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleCreateExam = async (e: any) => {
    e.preventDefault();
    const creatorID = session?.user?.id;
    if (!creatorID) {
      console.log('❌ ~ file: Nav.tsx:59 : creatorID not found');
      return;
    }
    const exam: ExamInterface = {
      creatorID: session?.user?.id!,
      examID: '',
      title: 'Exam Title',
      description: 'Exam Description',
      questions: [],
      startTime: addMinutes(new Date(), 60),
      duration: 30,
      totalMarks: 0,
      allowedAbilities: [
        {
          type: 'copy',
          isAllowed: false,
        },
        {
          type: 'print',
          isAllowed: true,
        },
      ],
    };
    const response = await fetch('/api/exams', {
      method: 'POST',
      body: JSON.stringify({
        exam: exam,
      }),
    });
    const data = await response.json();
    if (data.status == 200 && data.examID) router.push('/exam/create/' + data.examID);
  };
  const handleLogout = () => {
    signOut();
    console.log('Logged Out');
  };

  return (
    <div
      className='-purple fixed left-0 top-0 m-0 flex h-screen
                    w-20 flex-col justify-center border bg-slate-50 text-white shadow-lg'
    >
      <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position: 'fixed', top: '10%', alignSelf: 'center' }}>
        <Image
          src='/assets/images/porikkha-logo.svg'
          alt='Porikkha Logo'
          width={50}
          height={50}
          className='object-contain'
          // style={{ position:"absolute", alignSelf:"center" }}
        />
        <p className='logo_text'>Porikkha</p>
      </div>
      <Link href='/dashboard'>
        <SideBarIcon icon={<LuHome />} />
      </Link>
      <Link href='/profile'>
        <SideBarIcon icon={<LuUser />} />
      </Link>
      <div onClick={handleCreateExam}>
        <SideBarIcon icon={<BiAddToQueue />} />
      </div>
      <Link href='/exam/results/own'>
        <SideBarIcon icon={<LuBarChart4 />} />
      </Link>
      <div onClick={handleLogout}>
        <SideBarIcon icon={<LuLogOut />} />
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => (
  <div className='sidebar-icon' style={{ fontSize: '2rem' }}>
    {icon}
  </div>
);
