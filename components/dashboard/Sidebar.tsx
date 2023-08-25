
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { LuBarChart, LuBarChart4, LuHome, LuLogOut, LuSettings, LuUser } from "react-icons/lu";
export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 border h-screen w-16 m-0
                    flex flex-col justify-center bg-slate-50 -purple text-white shadow-lg">
            <SideBarIcon icon={<LuHome />}/>
            <SideBarIcon icon={<LuUser />}/>
            <SideBarIcon icon={<LuSettings />}/>
            <SideBarIcon icon={<LuBarChart4 />}/>
            <SideBarIcon icon={<LuLogOut />}/>
        </div>
    )
}

const SideBarIcon = ({icon} : any) => (
    <div className="sidebar-icon">
        {icon}
    </div> 
)
    