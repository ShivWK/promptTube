import { Link, useLocation } from 'react-router-dom'
import LogoAndMenu from './LogoAndMenu'
import SearchBar from './SearchBar'
import { Brain } from 'lucide-react'
import Account from './Account'
import TabMenu from './TabMenu'
import { useEffect, useState } from 'react'

const Header = () => {
    const [showTabs, setShowTabs] = useState(true);
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (pathname !== "/") setShowTabs(false)
    }, [pathname])

    return (
        <header className='backdrop-blur-md fixed left-0 top-0 w-full'>
            <div className='p-2 lg:p-4 flex items-center justify-between'>
                <LogoAndMenu />
                <div className='flex items-center gap-4 lg:gap-10'>
                    <SearchBar />
                    <Link to={""} className='flex gap-1 lg:gap-1.5 items-center py-1 px-2 lg:px-3 lg:py-2 rounded-md bg-gradient-to-r from-[#ff0033] via-blue-500 to-green-600 font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear'>
                        <span className='max-md:hidden dark:text-white lg:text-xl tracking-wide'>Try </span>
                        <span className='dark:text-white lg:text-xl tracking-wide'>Promptly</span>
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