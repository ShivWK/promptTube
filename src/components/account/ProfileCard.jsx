import { useLazyGetChannelDetailsQuery } from "../../features/watch/watchApiSlice";
import { selectSubscriptions } from "../../features/userActivity/userActivitySlice";
import { selectSavedDataLoading, selectIsSmall } from "../../features/home/homeSlice";
import { selectUserDetails, setEmailVerification } from "../../features/auth/authSlice";
import { CircleCheck, CircleUserRound, Info, LogOut } from "lucide-react";
import { setToast } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import ChannelCard from "../common/ChannelCard";
import useFetch from "./../../hooks/useFetch";
import { signOut } from "firebase/auth";
import { useState } from "react";

const ProfileCard = () => {
    const [trigger, { isLoading }] = useLazyGetChannelDetailsQuery();

    const { name, email, isEmailVerified } = useSelector(selectUserDetails);
    const savedDataLoading = useSelector(selectSavedDataLoading);
    const subscriptions = useSelector(selectSubscriptions);
    const isSmall = useSelector(selectIsSmall);

    const [subscribedChannels, setSubscribedChannels] = useState([]);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const dispatch = useDispatch();

    console.log(isLoading)

    useFetch({
        trigger,
        setState: setSubscribedChannels,
        fetchWhat: "subscribed channels",
        id: subscriptions.join(",")
    })

    const signoutClickHandler = (e) => {
        e.stopPropagation()
        if (logoutLoading) return;

        const signout = async () => {
            setLogoutLoading(true);
            try {
                await signOut(auth);
                setLogoutLoading(false)
            } catch (err) {
                setLogoutLoading(false);
                dispatch(setToast({
                    message: "Unable to sign out. Please ty again!",
                    show: true,
                    error: true,
                }))
            }
        }
        signout()
    }

    const verifyEmailHandler = () => {
        dispatch(setEmailVerification({
            mode: "All",
            value: true,
        }))
    }

    return (
        <div className="flex flex-col gap-2 max-md:rounded-2xl items-center text-white bg-primary/40 p-4 px-6 w-[80%] md:w-fit text-xl max-md:mx-auto md:basis-[30%] self-start">
            <CircleUserRound strokeWidth={0.5} className="h-26 w-26 rounded-full" />
            <p>{name}</p>
            <div className="flex items-center gap-1">
                {isEmailVerified
                    ? <CircleCheck size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-green-400 justify-self-center" />
                    : <Info onClick={verifyEmailHandler} size={isSmall ? 19 : 20} strokeWidth={2.5} className="text-red-500 cursor-pointer transform active:scale-95 transition-all duration-100 ease-linear justify-self-center" />
                }
                <p className="truncate leading-5 max-w-60 text-center">{email}</p>
            </div>
            <button onClick={signoutClickHandler} className={`flex items-center justify-center gap-2 mt-4 dark:text-white w-full bg-primary p-1 rounded-md cursor-pointer transform transition-all duration-150 ease-linear ${!logoutLoading && "active:scale-95 hover:bg-[#c2072d]"}`}>
                {
                    logoutLoading
                        ? <DotBounceLoader />
                        : <div className="flex items-center gap-2 font-medium w-fit">
                            <LogOut />
                            <p>Sign out</p>
                        </div>
                }
            </button>

            <div className="self-start mt-1 hidden md:block w-64">
                <h2 className="text-lg font-medium tracking-wider my-2">Subscriptions</h2>
                <div className="flex flex-col gap-2 h-80 overflow-y-auto overflow-x-hidden pretty-scrollbar pb-2 pr-0.5">
                    {(isLoading || savedDataLoading) ? <p>Loading...</p>
                        : subscribedChannels.map((channel) => <ChannelCard channel={channel} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;