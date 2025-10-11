import { selectUserDetails, setEmailVerification } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircleCheck, CircleUserRound, Info, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useState } from "react";
import DotBounceLoader from "./DotBounceLoader";

const AccountCard = ({ isSmall, setShowAccountCard, }) => {
    const { name, email, isEmailVerified } = useSelector(selectUserDetails);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signoutClickHandler = (e) => {
        e.stopPropagation()
        if (isLoading) return;
        const signout = async () => {
            setLoading(true);
            try {
                await signOut(auth);
                setShowAccountCard(false)
                setLoading(false)
            } catch (err) {
                setLoading(false);
                dispatch({
                    message: "Unable to sign out. Please ty again!",
                    show: true,
                    error: true,
                })
            }
        }

        signout()
    }

    const verifyEmailHandler = () => {
        setShowAccountCard(false);
        dispatch(setEmailVerification({
            mode: "All",
            value: true,
        }))
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-13 -left-60 lg:-left-36 p-3 rounded-md bg-gray-700 z-70">
            <div className="flex items-center gap-2">
                {/* <img src="" alt="" /> */}
                <CircleUserRound size={isSmall ? 50 : 55} strokeWidth={1.5} className="dark:text-primary" />
                <div className="flex flex-col dark:text-white w-48 lg:w-52">
                    <p className="truncate leading-6 font-medium">{name}</p>
                    <div className="flex items-center gap-1">
                        {isEmailVerified
                            ? <CircleCheck size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-green-400" />
                            : <Info onClick={verifyEmailHandler} size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-red-500 cursor-pointer transform active:scale-95 transition-all duration-100 ease-linear" />
                        }
                        <p className="truncate leading-5">{email}</p>
                    </div>
                </div>
            </div>
            <button onClick={signoutClickHandler} className={`flex items-center justify-center gap-2 mt-4 dark:text-white w-full bg-primary p-1.5 rounded-md cursor-pointer transform transition-all duration-150 ease-linear ${!isLoading && "active:scale-95 hover:bg-[#c2072d]"}`}>
                {
                    isLoading
                        ? <DotBounceLoader />
                        : <div className="flex items-center gap-2 font-medium w-fit">
                            <LogOut />
                            <p>Sign out</p>
                        </div>
                }
            </button>

            <div className="absolute -top-[0.410rem] lg:-top-2 left-[16rem] lg:left-[17rem] border-b-8 border-l-8 border-r-8 border-b-gray-700 border-l-transparent border-r-transparent"></div>
        </div>
    )
}

export default AccountCard;