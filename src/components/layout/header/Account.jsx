import { CircleUserRound, LogIn } from "lucide-react";
import { selectLoggedInStatus } from "../../../features/authSlice";
import { useSelector } from "react-redux";

const Account = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  const isSmall = window.innerWidth <= 768;

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2.5">
        <span className="dark:text-gray-200 text-2xl font-semibold tracking-wide max-md:hidden">Name</span>
        <CircleUserRound size={isSmall ? 45 : 55} className="dark:text-gray-300" />
      </div>
    )
  } else {
    return (
      <div className="flex gap-1 lg:gap-1.5 items-center py-1 px-2 lg:px-3 lg:py-2 rounded-md bg-[#ff0033] font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear">
        <span className="text-white lg:text-xl tracking-wide">Sign In</span>
        <LogIn className="text-white" strokeWidth={3} />
      </div>
    )
  }

}

export default Account