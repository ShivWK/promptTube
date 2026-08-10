import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../../features/home/homeSlice";
import { Link } from "react-router-dom";

const LogoAndMenu = ({ showMenu = true, showName = false }) => {
    const dispatch = useDispatch();

    const menuClickHandler = () => {
        if (!showMenu) return;

        dispatch(setSidebar({
            mode: 'All',
            value: true,
        }))
    }

    return (
        <div className="flex gap-2 lg:gap-5 items-center">
            {showMenu &&
                <button>
                    <Menu
                        onClick={menuClickHandler}
                        className="dark:text-white cursor-pointer size-7"
                    />
                </button>
            }
            <Link to="/" className="flex gap-3 items-center cursor-pointer">
                <img src="/favicon/android-chrome-192x192.png" alt="site_logo" className={`${showMenu ? "h-10 lg:h-10 w-11 lg:w-11" : "h-11 lg:h-12 w-12 lg:w-13"}`} />
                <h1 className={`text-primary font-bold text-3xl ${!showName && "hidden md:inline"} select-none`}>
                    <span className="text-gray-100">Prompt</span>
                    <span>Tube</span>
                </h1>
            </Link>
        </div>
    )
}

export default LogoAndMenu