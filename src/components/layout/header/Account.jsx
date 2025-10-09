import { CircleUserRound, LogIn } from "lucide-react";
import { selectLoggedInStatus } from "../../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setOpenAuthForm, selectUserDetails } from "../../../features/authSlice";
import { useRef, useState } from "react";
import AccountCard from "../../common/AccountCard";

const Account = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  const { name } = useSelector(selectUserDetails);
  const [showAccountCard, setShowAccountCard] = useState(false)
  const accountBTnRef = useRef(null);
  const dispatch = useDispatch()

  const isSmall = window.innerWidth <= 768;

  const authClickHandler = () => {
    dispatch(setOpenAuthForm({
      mode: "All",
      value: true,
    }))
  }

  const blurHandler = () => {

  }

  if (isLoggedIn) {
    return (
      <div className="relative flex items-center gap-2.5">
        <span className="dark:text-gray-200 text-xl tracking-wide max-md:hidden max-w-28 truncate">{name}</span>
        <button
          ref={accountBTnRef}
          onBlur={() => setShowAccountCard(false)}
          onClick={() => setShowAccountCard(!showAccountCard)}
        >
          <CircleUserRound
            size={isSmall ? 44 : 40} strokeWidth={1.5}
            className={`dark:text-primary cursor-pointer hover:shadow-[0_0_5px_2px_#ff0033] ${showAccountCard && "shadow-[0_0_5px_2px_#ff0033]"} rounded-full`}
          />
        </button>
        {showAccountCard && <AccountCard isSmall={isSmall} setShowAccountCard={setShowAccountCard} accountRef={accountBTnRef} />}
      </div>
    )
  } else {
    return (
      <button onClick={authClickHandler} className="flex gap-1 lg:gap-1 items-center py-1 lg:py-1.5 px-2 lg:px-3 rounded-md bg-primary font-semibold cursor-pointer transform active:scale-[0.95] transition-all duration-75 ease-linear">
        <span className="text-white tracking-wide">Sign In</span>
        <LogIn className="text-white" strokeWidth={isSmall ? 2 : 2} />
      </button>
    )
  }

}

export default Account