import { CircleUserRound, Home, Brain } from "lucide-react"
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const SecondarySideMenu = () => {
  const isSmall = window.innerWidth <= 786;
  const [showSideMenu, setShowSideMenu] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const scrollHandler = () => {
      if (lastScrollY.current > window.scrollY) {
        setShowSideMenu(true);
      } else {
        setShowSideMenu(false)
      }

      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", scrollHandler);
    return () => removeEventListener("scroll", scrollHandler);
  }, [])

  return (<>
    <aside className={"fixed hidden md:flex top-1/2 -left-1 -translate-y-1/2 rounded-e-2xl p-2 flex-col dark:bg-gray-900"}>

      <Link to={"/"} className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Home size={isSmall ? 25 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm select-none">Home</span>
      </Link>

      <Link to={"/gptBrowser"} className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Brain size={isSmall ? 25 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm select-none">Promptly</span>
      </Link>

      <Link className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <CircleUserRound size={isSmall ? 25 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm select-none">You</span>
      </Link>
    </aside>

    <aside className={`fixed bottom-0 md:hidden ${showSideMenu ? "translate-y-0.5" : "translate-y-full"} p-2 justify-around w-full flex items-center backdrop-blur-2xl bg-black/40 transform transition-all duration-300 ease-linear`}>

      <Link to={"/"} className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Home size={isSmall ? 28 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm hidden md:block select-none">Home</span>
      </Link>

      <Link to={"/gptBrowser"} className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <Brain size={isSmall ? 28 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm hidden md:block select-none">Promptly</span>
      </Link>

      <Link className="rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear">
        <CircleUserRound size={isSmall ? 28 : 30} className="dark:text-gray-200" />
        <span className="dark:text-gray-200 text-sm hidden md:block select-none">You</span>
      </Link>
    </aside>
  </>)
}
export default SecondarySideMenu;