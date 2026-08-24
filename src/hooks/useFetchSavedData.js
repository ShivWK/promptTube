import { useSelector, useDispatch } from "react-redux";
import { selectAuthLoading, selectUserDetails } from "../features/auth/authSlice";
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
    const authLoading = useSelector(selectAuthLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (userId && !authLoading) {
                await Promise.all([
                    triggerVideos({ userId }).unwrap(),
                    triggerSubscriptions({ userId }).unwrap(),
                    triggerComments({ userId }).unwrap(),
                ])
            }
        }

        fetchData();
    }, [userId, triggerComments, triggerSubscriptions, triggerVideos, dispatch, authLoading])
}

export default useFetchSavedData;