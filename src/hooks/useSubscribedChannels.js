import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectUserDetails } from "../features/auth/authSlice";
import { useGetSubscriptionsQuery } from "../features/userActivity/userActivityApiSlice";
import { useGetChannelDetailsQuery } from "../features/watch/watchApiSlice";

const useSubscribedChannels = () => {
    const authLoading = useSelector(selectAuthLoading);
    const { id: userId } = useSelector(selectUserDetails);

    const { data: subscriptionData, isLoading: subscriptionsLoading } = useGetSubscriptionsQuery(
        { userId },
        {
            skip: !userId
        }
    );

    const channelIds = useMemo(
        () => subscriptionData?.data?.[0]?.channelId ?? [],
        [subscriptionData]
    );

    const {
        data: channelDetails,
        isLoading: channelsLoading,
        isFetching: channelsFetching,
    } = useGetChannelDetailsQuery(
        { ids: channelIds },
        {
            skip: channelIds.length === 0
        }
    );

    return {
        channelIds,
        channels: channelDetails?.items ?? [],

        isLoading:
            authLoading ||
            subscriptionsLoading ||
            channelsLoading,

        isFetching: channelsFetching,
    };
};

export default useSubscribedChannels;