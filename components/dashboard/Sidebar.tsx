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

import {
  signOut
} from 'next-auth/react';

import Link from 'next/link';
export default function Sidebar() {

  const handleLogout = () => {
    signOut();
    console.log("Logged Out");
  }

  return (
    <div
      className='-purple fixed left-0 top-0 m-0 flex h-screen
                    w-16 flex-col justify-center border bg-slate-50 text-white shadow-lg'
    >
      <Link href="/dashboard">
      <SideBarIcon icon={<LuHome />} />
      </Link>
      <Link href="/profile">
      <SideBarIcon icon={<LuUser />} />
      </Link>
      <SideBarIcon icon={<LuSettings />} />
      <SideBarIcon icon={<LuBarChart4 />} />
      <div onClick={handleLogout}>
      <SideBarIcon icon={<LuLogOut />} />
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon }: any) => <div className='sidebar-icon'>{icon}</div>;
