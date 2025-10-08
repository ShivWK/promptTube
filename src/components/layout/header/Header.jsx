import { Link, useLocation } from 'react-router-dom'
import LogoAndMenu from './LogoAndMenu'
import SearchBar from './SearchBar'
import { Brain } from 'lucide-react'
import Account from './Account'
import TabMenu from './TabMenu'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedInStatus } from '../../../features/authSlice'

const Header = () => {
    const [showTabs, setShowTabs] = useState(true);
    const pathname = useLocation().pathname;
    const isLoggedIn = useSelector(selectLoggedInStatus);

    useEffect(() => {
        if (pathname !== "/") setShowTabs(false);
        else setShowTabs(true);
    }, [pathname])

    return (
        <header className='backdrop-blur-md fixed left-0 top-0 w-full'>
            <div className='p-1.5 pt-3 lg:p-4 flex items-center justify-between'>
                <LogoAndMenu />
                <div className='flex items-center gap-3 lg:gap-8'>
                    <SearchBar />
                    <Link to={"/gptBrowser"} className='flex gap-1 lg:gap-1.5 items-center py-1 lg:py-1.5 px-2 lg:px-3 rounded-md bg-gradient-to-r from-primary via-blue-500 to-green-400 font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear'>
                        <span className='max-md:hidden dark:text-white tracking-wide'>Try </span>
                        <span className='dark:text-white tracking-wide'>Promptly</span>
                        <Brain className='dark:text-white' />
                    </Link>
                    <Account />
                </div>
            </div>
            { showTabs && <TabMenu />}
        </header>
    )
}

export default Header;

{/* <LoaderPinwheel /> */ }