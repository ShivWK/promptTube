import { CircleUserRound, LogIn } from "lucide-react";
import { selectLoggedInStatus, setOpenAuthForm, selectUserDetails } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import AccountCard from "../../common/AccountCard";

const Account = () => {
  const isLoggedIn = useSelector(selectLoggedInStatus);
  const { name } = useSelector(selectUserDetails);
  const [showAccountCard, setShowAccountCard] = useState(false);
  const [animateAccountCard, setAnimateAccountCard] = useState(false);
  const accountRef = useRef(null);
  const timer = useRef(null);
  const dispatch = useDispatch()

  const isSmall = window.innerWidth <= 768;

  const authClickHandler = () => {
    dispatch(setOpenAuthForm({
      mode: "All",
      value: true,
    }))
  }

  useEffect(() => {
    const handleDocClick = () => {
      if (showAccountCard) {
        setAnimateAccountCard(false)
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick)
  }, [showAccountCard])

  const handleAccountClick = (e) => {
    e.stopPropagation();
    // setShowAccountCard(!showAccountCard)
  }

  const disableAccountCard = () => {
    console.log("Called")
    timer.current = setTimeout(() => {
      setAnimateAccountCard(false)
    }, 1000)
  }

  const handleMouseEnter = () => {
    clearTimeout(timer.current);

    if (!animateAccountCard) {
      setAnimateAccountCard(true)
      setShowAccountCard(true);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="relative flex items-center gap-2.5">
        <span className="dark:text-gray-200 text-xl tracking-wide max-md:hidden max-w-28 truncate">{name}</span>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={disableAccountCard} >
          <CircleUserRound
            ref={accountRef}
            onClick={handleAccountClick}
            size={isSmall ? 44 : 40} strokeWidth={1}
            className={`dark:text-primary cursor-pointer hover:shadow-[0_0_5px_2px_#ff0033] ${showAccountCard && "shadow-[0_0_5px_2px_#ff0033]"} rounded-full`}
          />
        </div>

        {showAccountCard && <AccountCard
          isSmall={isSmall}
          setShowAccountCard={setShowAccountCard}
          animate={animateAccountCard}
          timeoutTimer={timer}
          disableAccountCard={disableAccountCard}
          setAnimateAccountCard={setAnimateAccountCard}
        />}
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