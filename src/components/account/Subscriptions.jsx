import { selectChannelsData, selectSubscriptionLoading } from "../../features/userActivity/userActivitySlice";
import { selectSavedDataLoading, selectIsSmall } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";
import ChannelCard from "../common/ChannelCard";
import ChannelShimmerCard from "../shimmer/ChannelShimmerCard";

const Subscriptions = () => {
    const isSmall = useSelector(selectIsSmall);
    const subscriptionData = useSelector(selectChannelsData);
    const savedDataLoading = useSelector(selectSavedDataLoading);
    const subscriptionLoading = useSelector(selectSubscriptionLoading);

    const shimmerArray = Array.from({ length: 10 });

    const showLoading = isSmall && (savedDataLoading || subscriptionLoading);

    if (showLoading) {
        return (
            <div className="my-3 flex flex-col gap-2.5 px-1">
                <div className="w-32 h-6 md:h-7 rounded animate-shimmer-bg" />
                <div className="flex gap-3 overflow-auto scrollbar-hide">
                    {shimmerArray.map((_, index) => (
                        <ChannelShimmerCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (subscriptionData.length === 0) {
        return null;
    }

    return (
        <div id="subscriptions" className="md:hidden px-1 mt-2">
            <HorizontalCarousel
                Card={ChannelCard}
                heading="Subscriptions"
                dataToMap={[...subscriptionData].reverse()}
            />
        </div>
    );
};

export default Subscriptions;