import { manageComments, manageSubscriptions } from "../features/userActivity/userActivitySlice";
import { manageHistory, manageLikedVideos, manageWatchLater } from "../features/watch/watchSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUserDetails } from "../features/auth/authSlice";
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

                console.log(videos);

                dispatch(manageSubscriptions({
                    mode: "base",
                    channelId: subscriptions.data?.[0].channelId,
                }))

                dispatch(manageComments({
                    mode: "base",
                    comment: comments.data,
                }))

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
        }

        fetchData();
    }, [userId])
}

export default useFetchSavedData;