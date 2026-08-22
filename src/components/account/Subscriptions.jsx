import HorizontalCarousel from "../common/HorizontalCarousel";
import ChannelCard from "../common/ChannelCard";
import ChannelShimmerCard from "../shimmer/ChannelShimmerCard";
import useSubscribedChannels from "../../hooks/useSubscribedChannels";

const Subscriptions = () => {
    const {channels, isLoading} =  useSubscribedChannels();
    const shimmerArray = Array.from({ length: 10 });

    if (isLoading) {
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

    if (channels.length === 0) {
        return null;
    }

    return (
        <div id="subscriptions" className="md:hidden px-1 mt-2">
            <HorizontalCarousel
                Card={ChannelCard}
                heading="Subscriptions"
                dataToMap={[...channels].reverse()}
            />
        </div>
    );
};

export default Subscriptions;