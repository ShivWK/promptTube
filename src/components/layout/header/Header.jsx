import { Link, NavLink, useLocation } from 'react-router-dom'
import LogoAndMenu from './LogoAndMenu'
import SearchBar from '../../search/SearchBar'
import { Brain, Search } from 'lucide-react'
import Account from './Account'
import TabMenu from './TabMenu'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectIsSmall, selectSidebar } from '../../../features/home/homeSlice';
import { selectEmailVerification, selectOpenAuthFrom } from '../../../features/auth/authSlice'

const Header = () => {
    const isSmall = useSelector(selectIsSmall);
    const [showTabs, setShowTabs] = useState(true);
    const pathname = useLocation().pathname;
    const { openSidebar } = useSelector(selectSidebar);
    const openAuthForm = useSelector(selectOpenAuthFrom);
    const { openEmailVerification } = useSelector(selectEmailVerification);

    useEffect(() => {
        if (pathname === "/" || pathname === "/pc_search" || pathname === "/category_videos") setShowTabs(true);
        else setShowTabs(false);
    }, [pathname])

    useEffect(() => {
        if (openSidebar || openAuthForm || openEmailVerification) {
            const html = document.documentElement;
            const scrollbarWidth = window.innerWidth - html.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.getElementById("header").style.paddingRight = `${scrollbarWidth}px`
        } else {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0px";
            document.getElementById("header").style.paddingRight = "0px";
        }
    }, [openSidebar, openAuthForm, openEmailVerification]);

    return (
        <header id='header' className={`backdrop-blur-2xl fixed left-0 top-0 w-full bg-black/40 z-50 ${pathname === "/search" && "rounded-b-3xl"}`}>
            <div className='p-1.5 pt-3 lg:p-4 flex items-center justify-between bg-black/40'>
                <LogoAndMenu />
                <div className='flex items-center gap-3 md:gap-7'>
                    {
                        isSmall
                            ? <NavLink to={"/search"} className={({ isActive }) => isActive ? "p-2 dark:bg-primary rounded-full overflow-hidden"
                                : "p-2 dark:bg-gray-700 rounded-full overflow-hidden"}>
                                <Search size={isSmall ? 20 : 25} strokeWidth={1.5} className="dark:text-white" />
                            </NavLink>
                            : <SearchBar />
                    }
                    <Link to={"/gptBrowser"} className='flex gap-1 lg:gap-1.5 items-center py-1 lg:py-1.5 px-2 lg:px-3 rounded-md bg-gradient-to-r from-primary via-blue-500 to-green-400 font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear'>
                        <span className='max-md:hidden dark:text-white tracking-wide'>Try </span>
                        <span className='dark:text-white tracking-wide'>Promptly</span>
                        <Brain className='dark:text-white' />
                    </Link>
                    <Account />
                </div>
            </div>
            {showTabs && <TabMenu />}
            {pathname === "/search" && <div className='w-full backdrop-blur-md flex items-center justify-center py-4 rounded-b-3xl'>
                <div className='w-[95%]'>
                    <SearchBar />
                </div>
            </div>}
        </header>
    )
}

export default Header;
