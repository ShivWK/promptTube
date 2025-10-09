import { selectUserDetails, setToast } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircleUserRound, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useState } from "react";
import DotBounceLoader from "./DotBounceLoader";

const AccountCard = ({ isSmall, setShowAccountCard, accountRef }) => {
    const { name, email, id } = useSelector(selectUserDetails);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const signoutClickHandler = () => {
        accountRef.current.focus()
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

    return (
        <div className="absolute top-13 -left-56 lg:-left-32 p-3 rounded-md bg-gray-700 z-70">
            <div className="flex items-center gap-2">
                {/* <img src="" alt="" /> */}
                <CircleUserRound size={isSmall ? 50 : 55} strokeWidth={1.5} className="dark:text-primary" />
                <div className="flex flex-col dark:text-white w-44 lg:w-48">
                    <p className="truncate leading-5">{name}</p>
                    <p className="truncate leading-5">{email}</p>
                </div>
            </div>
            <button onClick={signoutClickHandler} className={`flex items-center justify-center gap-2 mt-2 dark:text-white w-full bg-primary hover:bg-[#c2072d] p-1.5 rounded-md cursor-pointer transform transition-all duration-150 ease-linear ${ !isLoading && "active:scale-95" }`}>
                {
                    isLoading
                        ? <DotBounceLoader />
                        : <div className="flex items-center gap-2 font-medium w-fit">
                            <LogOut />
                            <p>Sign out</p>
                        </div>
                }
            </button>

            <div className="absolute -top-[0.410rem] lg:-top-2 left-[14.8rem] lg:left-64 border-b-8 border-l-8 border-r-8 border-b-gray-700 border-l-transparent border-r-transparent"></div>
        </div>
    )
}

export default AccountCard