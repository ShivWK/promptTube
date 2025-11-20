import { Search, Home, Brain } from "lucide-react"
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { setMobileMenu, selectFooterVisibility } from "../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";

const SecondarySideMenu = () => {
  const isSmall = window.innerWidth <= 786;
  const [showSideMenu, setShowSideMenu] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const dispatch = useDispatch();
  const footerVisible = useSelector(selectFooterVisibility);

  useEffect(() => {
    const scrollHandler = () => {
      if (lastScrollY.current > window.scrollY) {
        setShowSideMenu(true);
        dispatch(setMobileMenu(true));
      } else {
        setShowSideMenu(false)
        dispatch(setMobileMenu(false));
      }

      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", scrollHandler);
    return () => removeEventListener("scroll", scrollHandler);
  }, [])

  const pcActiveClass = ({ isActive }) => {
    if (isActive) {
      return "rounded-e-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear text-primary"
    }

    return "rounded-e-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear dark:text-gray-200"
  }

  const nmActiveClass = ({ isActive }) => {
    if (isActive) {
      return "rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear text-primary"
    }

    return "rounded-xl flex flex-col justify-center items-center py-1.5 px-2 lg:py-2 lg:px-3 active:bg-gray-400/30 hover:bg-gray-400/30 transition-all duration-100 ease-linear dark:text-gray-200"
  }

  return (<>

    {/* PC */}
    <aside className={`fixed hidden md:flex gap-y-1 top-1/2 ${footerVisible ? "-translate-x-full" : "-translate-x-2"} -translate-y-[40%] rounded-e-2xl p-1 flex-col dark:bg-gray-900 transition-all duration-150 ease-linear z-30`}>

      <NavLink to={"/"} className={pcActiveClass}>
        <Home size={isSmall ? 25 : 30} />
        <span className="text-sm select-none">Home</span>
      </NavLink>

      <NavLink to={"/gptBrowser"} className={pcActiveClass}>
        <Brain size={isSmall ? 25 : 30} />
        <span className="text-sm select-none">Promptly</span>
      </NavLink>
    </aside>

    {/* Mobile */}
    <aside className={`fixed bottom-0 md:hidden ${showSideMenu ? "translate-y-0.5" : "translate-y-full"} p-2 justify-around w-full flex items-center backdrop-blur-2xl bg-black/40 transform transition-all duration-[250ms] ease-linear z-30`}>

      <NavLink to={"/"} className={nmActiveClass}>
        <Home size={isSmall ? 28 : 30} />
      </NavLink>

      <NavLink to={"/search"} className={nmActiveClass}>
        <Search size={isSmall ? 28 : 30} />
      </NavLink>

      <NavLink to={"/gptBrowser"} className={nmActiveClass}>
        <Brain size={isSmall ? 28 : 30} />
      </NavLink>
    </aside>
  </>)
}
export default SecondarySideMenu;