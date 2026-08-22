import { useMemo } from "react";
import { useGetSavedVideosQuery } from "../features/userActivity/userActivityApiSlice";
import { useSelector } from "react-redux";
import {
    selectAuthLoading,
    selectUserDetails
} from "../features/auth/authSlice";

const useSavedVideosData = () => {
    const authLoading = useSelector(selectAuthLoading);
    const { id: userId } = useSelector(selectUserDetails);

    const {
        data: savedVideos,
        isLoading: savedDataLoading,
        isFetching: savedDataFetching,
    } = useGetSavedVideosQuery(
        { userId },
        {
            skip: !userId
        }
    );

    const savedVideoData = useMemo(() => savedVideos?.data ?? [], [savedVideos]);

    const historyVideoIds = useMemo(() =>
        savedVideoData.find(
            item => item.videoType === "history"
        )?.videoId ?? [],
        [savedVideoData]
    );

    const watchLaterVideoIds = useMemo(() =>
        savedVideoData.find(
            item => item.videoType === "watch-later"
        )?.videoId ?? [],
        [savedVideoData]
    );

    const likedVideoIds = useMemo(() =>
        savedVideoData.find(
            item => item.videoType === "liked"
        )?.videoId ?? [],
        [savedVideoData]
    );

    return {
        userId,

        savedVideoData,

        historyVideoIds,
        watchLaterVideoIds,
        likedVideoIds,

        isLoading: authLoading || savedDataLoading,
        isFetching: savedDataFetching,

        authLoading,
        savedDataLoading,
    };
};

export default useSavedVideosData;