import { useLazyGetChannelDetailsQuery } from "../../features/watch/watchApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import countViews from "../../utils/countViews";
import useFetch from "../../hooks/useFetch";
import { manageLikedVideos, manageWatchLater, selectLikedVideos, selectWatchLater } from "../../features/watch/watchSlice";
import { addVideo } from "../../features/watch/watchSlice";
import { manageSubscriptions, selectSubscriptions, setSubscription } from "../../features/userActivity/userActivitySlice";
import useAuthCheck from "../../hooks/useAuthCheck";

const Channel = ({ channelId: id, videoId }) => {
    const [trigger, { isLoading }] = useLazyGetChannelDetailsQuery();
    const [ _, checkAuth ] = useAuthCheck()
    const [channel, setChannel] = useState([]);
    const [liked, setLiked] = useState(false);
    const [watchLaterSaved, setWatchLaterSaved] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const { id: userId } = useSelector(selectUserDetails);
    const likedVideos = useSelector(selectLikedVideos);
    const watchLaterVideos = useSelector(selectWatchLater);
    const subscriptions = useSelector(selectSubscriptions);
    const dispatch = useDispatch();

    useFetch({ trigger, id, setState: setChannel, fetchWhat: "channel details" });

    const likeCLickHandler = (mode) => {
        const check = checkAuth();
        if (!check) return;

        if (mode === "add") {
            dispatch(manageLikedVideos({ mode: "add", videoId }));
            dispatch(addVideo({
                method: "PATCH",
                userId,
                videoType: "liked",
                videoId
            }))
        } else {
            dispatch(manageLikedVideos({ mode: "remove", videoId }));
            dispatch(addVideo({
                method: "DELETE",
                userId,
                videoType: "liked",
                videoId
            }))
        }
    }

    const watchLaterClickHandler = (mode) => {
        const check = checkAuth();
        if (!check) return;

        if (mode === "add") {
            dispatch(manageWatchLater({ mode: "add", videoId }));
            dispatch(addVideo({
                method: "PATCH",
                userId,
                videoType: "watch-later",
                videoId
            }))
        } else {
            dispatch(manageWatchLater({ mode: "remove", videoId }));
            dispatch(addVideo({
                method: "DELETE",
                userId,
                videoType: "watch-later",
                videoId
            }))
        }
    }

    const subscribeClickHandler = (mode) => {
        const check = checkAuth();
        if (!check) return;

        if (!subscribed) {
            dispatch(manageSubscriptions({ mode: "add", channelId: id }));
            dispatch(setSubscription({
                method: "PATCH",
                userId,
                channelId: id
            }))
        } else {
            dispatch(manageSubscriptions({ mode: "remove", channelId: id }));
            dispatch(setSubscription({
                method: "DELETE",
                userId,
                channelId: id
            }))
        }
    }

    useEffect(() => {
        if (likedVideos.includes(videoId)) setLiked(true);
        else setLiked(false);
    }, [likedVideos])

    useEffect(() => {
        if (watchLaterVideos.includes(videoId)) setWatchLaterSaved(true);
        else setWatchLaterSaved(false);
    }, [watchLaterVideos]);

    useEffect(() => {
        if (subscriptions.includes(id)) setSubscribed(true);
        else setSubscribed(false);
    }, [subscriptions])

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 dark:text-gray-100">
                {!isLoading && <img src={channel[0]?.snippet?.thumbnails?.default?.url} alt="channel_logo" className="rounded-full h-11 md:h-14 w-11 md:w-14 border border-gray-400" />}
                <div className="h-fit">
                    <h2 className="text-sm md:text-lg leading-5 font-medium tracking-wider max-w-40 md:max-w-[26rem] truncate">{channel[0]?.snippet?.title}</h2>
                    <p className="max-md:text-xs dark:text-gray-300">{countViews(channel[0]?.statistics?.subscriberCount)}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
                <div className="">
                    {!liked ? <i onClick={() => likeCLickHandler("add")} className="ri-thumb-up-line text-xl md:text-2xl dark:text-white cursor-pointer"></i>
                        : <i onClick={() => likeCLickHandler("remove")} className="ri-thumb-up-fill text-xl md:text-2xl dark:text-primary cursor-pointer"></i>}
                </div>
                <div>
                    {!watchLaterSaved ? <i onClick={() => watchLaterClickHandler("add")} className="ri-time-line text-xl md:text-2xl dark:text-white cursor-pointer" />
                        : <i onClick={() => watchLaterClickHandler("remove")} className="ri-time-fill text-xl md:text-2xl dark:text-primary cursor-pointer" />
                    }
                </div>
                <button onClick={subscribeClickHandler} className={`px-3 py-1 rounded ${subscribed ? "bg-gray-300 text-black" : "bg-primary text-white active:scale-95"} transform transition-all duration-150 ease-linear tracking-wide cursor-pointer max-md:text-sm font-medium`}>
                    {subscribed ? "Subscribed" : "Subscribe"}
                </button>
            </div>
        </div>
    )
}

export default Channel