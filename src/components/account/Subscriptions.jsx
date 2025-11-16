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
    const shimmerArray = Array.from({ length: 10 })

    return (
        isSmall && (savedDataLoading || subscriptionLoading) ? <div className="my-3 flex flex-col gap-2.5 px-1 overflow-hidden">
            <div className="animate-shimmer-bg w-32 h-6 md:h-7"></div>
            <div className="flex gap-3">
                {shimmerArray.map((_, index) => <ChannelShimmerCard key={index} />)}
            </div>
        </div>
            : <div id="subscriptions" className="md:hidden px-1 mt-2">
                <HorizontalCarousel
                    Card={ChannelCard}
                    heading="Subscription"
                    dataToMap={[...subscriptionData].reverse()}
                />
            </div>
    )
}

export default Subscriptions;