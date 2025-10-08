import { CircleUserRound, Home, GripVertical } from "lucide-react"
import { useState } from "react";

const SideMenu = () => {
  const isSmall = window.innerWidth <= 786;
  const [ showSideMenu, setShowSideMenu ] = useState(false);

  return (
    <aside className={`fixed top-4/6 md:top-1/2 ${ showSideMenu ? "max-md:-left-1" : "max-md:-left-19" } md:-left-1 -translate-y-1/2 rounded-e-2xl p-2 flex flex-col dark:bg-gray-900 transition-all duration-100 ease-linear`}>
      
      <div className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Home size={isSmall ? 25 : 35} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 select-none">Home</span>
      </div>

      <div className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-3 lg:px-4 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <CircleUserRound size={isSmall ? 25 : 35} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 select-none">You</span>
      </div>

      <div onClick={() => setShowSideMenu(!showSideMenu)} className="absolute top-1/2 -translate-y-1/2 -right-[1.4rem] py-2 rounded-e-md bg-gray-900  dark:text-white md:hidden">
        <GripVertical />
      </div>
    </aside>
  )
}
{/* <GripVertical /> */}
export default SideMenu;