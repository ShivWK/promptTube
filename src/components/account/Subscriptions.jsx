import { selectChannelsData, selectSubscriptionLoading } from "../../features/userActivity/userActivitySlice";
import { selectSavedDataLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";
import ChannelCard from "../common/ChannelCard";

const Subscriptions = () => {
    const subscriptionData = useSelector(selectChannelsData);
    const savedDataLoading = useSelector(selectSavedDataLoading);
    const subscriptionLoading = useSelector(selectSubscriptionLoading);



    return (
        (savedDataLoading || subscriptionLoading) ? <p>Loading...</p>
            : <div className="md:hidden px-1 mt-2">
                <HorizontalCarousel
                    Card={ChannelCard}
                    heading="Subscription"
                    dataToMap={[...subscriptionData].reverse()}
                />
            </div>
    )
}

export default Subscriptions;