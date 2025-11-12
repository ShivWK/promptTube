import { selectChannelsData, selectSubscriptionLoading } from "../../features/userActivity/userActivitySlice";
import { selectSavedDataLoading, selectIsSmall } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";
import ChannelCard from "../common/ChannelCard";

const Subscriptions = () => {
    const isSmall = useSelector(selectIsSmall);
    const subscriptionData = useSelector(selectChannelsData);
    const savedDataLoading = useSelector(selectSavedDataLoading);
    const subscriptionLoading = useSelector(selectSubscriptionLoading);

    return (
         isSmall && (savedDataLoading || subscriptionLoading) ? <p>Loading...</p>
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