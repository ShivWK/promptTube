import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../../features/home/homeSlice";

const LogoAndMenu = ({ showMenu = true , showName = false }) => {
    const isSmall = window.innerWidth <= 798;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menuClickHandler = () => {
        dispatch(setSidebar({
            mode: 'All',
            value: true,
        }))
    }

    return (
        <div className="flex gap-2 lg:gap-5 items-center">
            { showMenu && <Menu onClick={menuClickHandler} size={isSmall ? 30 : 30} className="dark:text-white cursor-pointer" />}
            <div onClick={() => navigate("/")} className="flex gap-3 cursor-pointer">
                <img src="/favicon/android-chrome-192x192.png" alt="site_logo" className="h-10 lg:h-10 w-11 lg:w-11"></img>
                <h1 className={`text-primary font-bold text-3xl ${!showName && "hidden md:inline"} select-none`}>
                    <span className="text-gray-100">Prompt</span>
                    <span>Tube</span>
                </h1>
            </div>
        </div>
    )
}

export default LogoAndMenu