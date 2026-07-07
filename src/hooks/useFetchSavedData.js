import { manageComments, manageSubscriptions } from "../features/userActivity/userActivitySlice";
import { manageHistory, manageLikedVideos, manageWatchLater } from "../features/watch/watchSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails } from "../features/auth/authSlice";
import { setSavedDataLoading } from "../features/home/homeSlice";
import { useEffect } from "react"

import {
    useLazyGetCommentsQuery,
    useLazyGetSubscriptionsQuery,
    useLazyGetSavedVideosQuery
} from "../features/userActivity/userActivityApiSlice"

const useFetchSavedData = () => {
    const [triggerVideos] = useLazyGetSavedVideosQuery();
    const [triggerSubscriptions] = useLazyGetSubscriptionsQuery();
    const [triggerComments] = useLazyGetCommentsQuery();
    const { id: userId } = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const [videos, subscriptions, comments] = await Promise.all([
                    triggerVideos({ userId }).unwrap(),
                    triggerSubscriptions({ userId }).unwrap(),
                    triggerComments({ userId }).unwrap(),
                ])

                // console.log("Got Videos", videos);
                // console.log("Got subscription", subscriptions);
                // console.log("Got comments", comments);

                if (subscriptions.data.length !== 0) {
                    dispatch(manageSubscriptions({
                        mode: "base",
                        channelId: subscriptions.data?.[0].channelId,
                    }))
                }

                if (comments.data.length !== 0) {
                    dispatch(manageComments({
                        mode: "base",
                        comment: comments.data,
                    }))
                }

                if (videos.data.length !== 0) {
                    for (let objs of videos.data) {
                        if (objs.videoType === "history") {
                            dispatch(manageHistory({
                                mode: "base",
                                videoId: objs.videoId,
                            }))
                        } else if (objs.videoType === "liked") {
                            dispatch(manageLikedVideos({
                                mode: "base",
                                videoId: objs.videoId,
                            }))
                        } else {
                            dispatch(manageWatchLater({
                                mode: "base",
                                videoId: objs.videoId,
                            }))
                        }
                    }
                }

                dispatch(setSavedDataLoading(false));
            }
        }

        fetchData();
    }, [userId, triggerComments, triggerSubscriptions, triggerVideos, dispatch])
}

export default useFetchSavedData;