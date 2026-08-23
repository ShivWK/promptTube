import { useGetChannelDetailsQuery } from "../../features/watch/watchApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading, selectUserDetails } from "../../features/auth/authSlice";
import { useEffect, useMemo, useState } from "react";
import countViews from "../../utils/countViews";
import { setCurrentChannel } from "../../features/watch/watchSlice";
import useAuthCheck from "../../hooks/useAuthCheck";
import AccountShimmer from "../shimmer/AccountShimmer";
import { useNavigate } from "react-router-dom";
import { addToLocalStorage } from "../../utils/handleLocalStorage";
import {
    useAddSavedVideoMutation,
    useGetSubscriptionsQuery,
    useRemoveSavedVideoMutation,
    useSubscriptionMutation,
    useUnsubscribeMutation
} from "../../features/userActivity/userActivityApiSlice";
import useSavedVideosData from "../../hooks/useSavedVideoData";

const Channel = ({ channelId: id, videoId }) => {
    const { id: userId } = useSelector(selectUserDetails);
    const { data, isLoading: subsLoading } = useGetSubscriptionsQuery({ userId });
    const { likedVideoIds, watchLaterVideoIds, isLoading: savedVideosLoading } = useSavedVideosData();

    const subscriptions = useMemo(() => data?.data?.[0]?.channelId || [], [data]);

    const [subscribe, { isLoading: subscribeLoading }] = useSubscriptionMutation();
    const [unSubscribe, { isLoading: unSubscribeLoading }] = useUnsubscribeMutation();
    const [addVideo] = useAddSavedVideoMutation();
    const [removeVideo] = useRemoveSavedVideoMutation();

    const { data: channelData, isLoading } = useGetChannelDetailsQuery({ ids: [id] })
    const channel = channelData?.items?.[0];

    const [_, checkAuth] = useAuthCheck()

    const [liked, setLiked] = useState(false);
    const [watchLaterSaved, setWatchLaterSaved] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const authLoading = useSelector(selectAuthLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const likeClickHandler = async (mode) => {
        const check = checkAuth();
        if (!check) return;

        if (mode === "add") {
            await addVideo({
                userId,
                videoType: "liked",
                videoId
            })
        } else {
            await removeVideo({
                userId,
                videoId,
                videoType: "liked",
            })
        }
    }

    const watchLaterClickHandler = async (mode) => {
        const check = checkAuth();
        if (!check) return;

        if (mode === "add") {
            await addVideo({
                userId,
                videoType: "watch-later",
                videoId
            })
        } else {
            await removeVideo({
                userId,
                videoId,
                videoType: "watch-later",
            })
        }
    }

    const subscribeClickHandler = async () => {
        const check = checkAuth();

        if (subscribeLoading || unSubscribeLoading || !check) return;

        if (!subscribed) {
            try {
                await subscribe({ channelId: id, userId }).unwrap();
            } catch (err) {
                console.log("Can't subscribe", err)
            }
        } else {
            try {
                await unSubscribe({ channelId: id, userId }).unwrap();
            } catch (err) {
                console.log("Can't unsubscribe", err)
            }
        }
    }

    useEffect(() => {
        if (savedVideosLoading) return;

        if (likedVideoIds.includes(videoId)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [likedVideoIds, videoId, savedVideosLoading])

    useEffect(() => {
        if (savedVideosLoading) return;

        if (watchLaterVideoIds.includes(videoId)) {
            setWatchLaterSaved(true);
        } else {
            setWatchLaterSaved(false);
        }
    }, [watchLaterVideoIds, videoId, savedVideosLoading]);

    useEffect(() => {
        if (!subsLoading && !authLoading) {
            if (subscriptions.includes(id)) {
                setSubscribed(true);
            } else {
                setSubscribed(false);
            }
        }

    }, [subscriptions, id, authLoading, subsLoading])

    const cardClickHandler = (object) => {
        const uploadsPlayListId = object?.contentDetails?.relatedPlaylists?.uploads;
        navigate(`/channel?channelId=${object.id}&uploadsId=${uploadsPlayListId}`);

        dispatch(setCurrentChannel(object));
        addToLocalStorage({ add: object, name: "currentChannel" })
    }

    return (
        <div className="w-full flex items-center justify-between">
            {isLoading
                ? <div className="w-[30%] md:w-[25%]">
                    <AccountShimmer />
                </div>
                : <button
                    onClick={() => cardClickHandler(channel)}
                    className="flex items-center gap-2 md:gap-3 dark:text-gray-100 cursor-pointer"
                >
                    <img
                        src={channel?.snippet?.thumbnails?.default?.url}
                        alt="channel_logo"
                        className="rounded-full h-11 md:h-14 w-11 md:w-14 border border-gray-400"
                    />
                    <div className="h-fit">
                        <h2 className="text-sm md:text-lg leading-5 font-medium tracking-wider max-w-40 md:max-w-[26rem] truncate text-start" >
                            {channel?.snippet?.title}
                        </h2>
                        <p className="max-md:text-xs dark:text-gray-300 text-start">
                            {countViews(channel?.statistics?.subscriberCount)} Subscribers
                        </p>
                    </div>
                </button>}

            <div className="flex items-center gap-2
             md:gap-4 lg:gap-5">
                <div className="">
                    {!liked ? <i onClick={() => likeClickHandler("add")} className="ri-thumb-up-line text-xl md:text-2xl dark:text-white cursor-pointer"></i>
                        : <i onClick={() => likeClickHandler("remove")} className="ri-thumb-up-fill text-xl md:text-2xl dark:text-primary cursor-pointer"></i>}
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

export default Channel;