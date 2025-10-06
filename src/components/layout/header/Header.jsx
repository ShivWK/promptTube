import { Link } from 'react-router-dom'
import LogoAndMenu from './LogoAndMenu'
import SearchBar from './SearchBar'
import { Brain } from 'lucide-react'
import Account from './Account'

const Header = () => {
    return (
        <header className='p-2 lg:p-4 backdrop-blur-md fixed left-0 top-0 w-full border-2 flex items-center justify-between'>
            <LogoAndMenu />
            <div className='flex items-center gap-4 lg:gap-10'>
                <SearchBar />
                <Link to={""} className='flex gap-1.5 items-center p-1 lg:p-2 rounded-md bg-gradient-to-r from-[#ff0033] via-blue-500 to-green-600 font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear'>
                    <span className='max-md:hidden'>Try </span>
                    <span className='dark:text-white lg:text-xl tracking-wide'>Promptly</span>
                    <Brain className='dark:text-white' />
                </Link>

                <Account />
            </div>

        </header>
    )
}

export default Header;

{/* <LoaderPinwheel /> */ }