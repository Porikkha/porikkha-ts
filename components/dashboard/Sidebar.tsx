
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0
                    flex flex-col justify-center bg-gray-900 text-white shadow-lg">
            <SideBarIcon icon={<HomeIcon />}/>
            <SideBarIcon icon={<AppsIcon />}/>
            <SideBarIcon icon={<NotificationsNoneOutlinedIcon />}/>
            <SideBarIcon icon={<LogoutIcon />}/>
        </div>
    )
}

const SideBarIcon = ({icon} : any) => (
    <div className="sidebar-icon">
        {icon}
    </div> 
)
    