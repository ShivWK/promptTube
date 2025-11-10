import { CircleUserRound, CircleCheck, Info, LogOut } from "lucide-react";
import { selectUserDetails, setEmailVerification } from "../../features/auth/authSlice";
import { selectIsSmall } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useState } from "react";

const Account = () => {
  const { name, email, isEmailVerified, id } = useSelector(selectUserDetails);
  const isSmall = useSelector(selectIsSmall);
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const verifyEmailHandler = () => {
    dispatch(setEmailVerification({
      mode: "All",
      value: true,
    }))
  }

  const signoutClickHandler = (e) => {
    e.stopPropagation()
    if (isLoading) return;

    const signout = async () => {
      setLoading(true);
      try {
        await signOut(auth);
        setLoading(false)
      } catch (err) {
        setLoading(false);
        dispatch(setToast({
          message: "Unable to sign out. Please ty again!",
          show: true,
          error: true,
        }))
      }
    }
    signout()
  }

  return (
    <main className="pt-18 pb-20 lg:pt-24">
      <section className="max-w-[1300px] mx-auto flex flex-col md:flex-row max-md:justify-center md:items-center">
        <div className="flex flex-col gap-2 items-center text-white bg-primary/40 rounded-2xl p-4 px-8 w-[92%] md:w-fit text-xl max-md:mx-auto">
          <CircleUserRound strokeWidth={0.5} className="h-26 w-26 rounded-full" />
          <p>{name}</p>
          <div className="flex items-center gap-1">
            {isEmailVerified
              ? <CircleCheck size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-green-400" />
              : <Info onClick={verifyEmailHandler} size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-red-500 cursor-pointer transform active:scale-95 transition-all duration-100 ease-linear" />
            }
            <p className="truncate leading-5">{email}</p>
          </div>
          <button onClick={signoutClickHandler} className={`flex items-center justify-center gap-2 mt-4 dark:text-white w-full bg-primary p-1 rounded-md cursor-pointer transform transition-all duration-150 ease-linear ${!isLoading && "active:scale-95 hover:bg-[#c2072d]"}`}>
            {
              isLoading
                ? <DotBounceLoader />
                : <div className="flex items-center gap-2 font-medium w-fit">
                  <LogOut />
                  <p>Sign out</p>
                </div>
            }
          </button>
        </div>

        <div>

        </div>
      </section>
      <section>

      </section>
    </main>
  )
}

export default Account;