import watchApiSlice from "../../features/watch/watchApiSlice";
import { selectIsSmall } from "../../features/home/homeSlice";
import { selectUserDetails, setEmailVerification, resetAuthSlice } from "../../features/auth/authSlice";
import { resetUserActivitySlice } from "../../features/userActivity/userActivitySlice";
import { CircleCheck, Info, LogOut } from "lucide-react";
import { setToast } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import ChannelCard from "../common/ChannelCard";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import ChannelShimmerCard from "../shimmer/ChannelShimmerCard";
import userActivityApiSlice from "../../features/userActivity/userActivityApiSlice";
import { resetWatchSlice } from "../../features/watch/watchSlice";
import ProfilePicture from "./ProfilePicture";
import useSubscribedChannels from "../../hooks/useSubscribedChannels";

const ProfileCard = () => {
    const { name, email, isEmailVerified } = useSelector(selectUserDetails);
    const isSmall = useSelector(selectIsSmall);

    const [logoutLoading, setLogoutLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const shimmerArray = Array.from({ length: 3 })

    const { channels, isLoading } = useSubscribedChannels()

    const signoutClickHandler = (e) => {
        e.stopPropagation()
        if (logoutLoading) return;

        const signout = async () => {
            setLogoutLoading(true);
            try {
                await signOut(auth);
                setLogoutLoading(false);

                dispatch(resetAuthSlice());
                dispatch(resetUserActivitySlice());
                dispatch(resetWatchSlice());
                dispatch(userActivityApiSlice.util.resetApiState());
                dispatch(watchApiSlice.util.resetApiState());

                navigate("/", { replace: true });
            } catch (err) {
                console.log("Error in logout", err)
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

    const hasSubscriptions = channels.length > 0;

    return (
        <div className="flex flex-col gap-1 md:gap-2 max-md:rounded-2xl items-center text-white p-4 md:px-6 text-lg max-md:mx-auto self-stretch max-md:bg-primary/40 w-[80%] md:w-full mx-auto">
            <ProfilePicture />
            <p className="truncate max-w-60">{name}</p>
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

            {(isLoading || hasSubscriptions) && (
                <div id="subscriptions" className="self-start mt-1 hidden md:block w-full max-h-52 pretty-scrollbar overflow-auto">
                    <h2 className="text-lg font-medium tracking-wider my-2">
                        Subscriptions
                    </h2>

                    <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden pretty-scrollbar pb-2 pr-0.5">
                        {isLoading
                            ? shimmerArray.map((_, index) => (
                                <ChannelShimmerCard key={index} />
                            ))
                            : channels.map((channel) => (
                                <ChannelCard key={channel.id} object={channel} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileCard;