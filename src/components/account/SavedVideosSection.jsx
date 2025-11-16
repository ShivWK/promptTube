import { selectLikedVideos, selectHistory, selectWatchLater } from "../../features/watch/watchSlice";
import { useLazyGetVideoByIdQuery } from "../../features/watch/watchApiSlice";
import { selectSavedDataLoading } from "../../features/home/homeSlice";
import { useState, useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";
import SavedVideoShimmerCard from "../shimmer/SavedVideoShimmerCard";

const ShimmerUi = () => {
    const shimmerArray = Array.from({ length: 3 });

    return <div className="flex flex-col gap-4 md:gap-6">
        <div className="w-32 h-6 md:h-7 rounded animate-shimmer-bg" />
        <div className="flex gap-3 overflow-auto scrollbar-hide">
            {shimmerArray.map((_, index) => <SavedVideoShimmerCard key={index} />)}
        </div>
    </div>
}

const SavedVideosSection = () => {
    const [triggerVideos] = useLazyGetVideoByIdQuery();
    const historyVideoIds = useSelector(selectHistory);
    const likedVideoIds = useSelector(selectLikedVideos);
    const watchLaterVideoIds = useSelector(selectWatchLater);
    const savedDataLoading = useSelector(selectSavedDataLoading);

    const [videosLoading, setVideosLoading] = useState(true);
    const [historyVideos, setHistoryVideos] = useState([]);
    const [watchLaterVideos, setWatchLaterVideos] = useState([]);
    const [likedVideos, setLikedVideos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            if (savedDataLoading) return;

            let [history, watchLater, liked] = await Promise.all([
                triggerVideos({ id: historyVideoIds.join(",") }),
                triggerVideos({ id: watchLaterVideoIds.join(",") }),
                triggerVideos({ id: likedVideoIds.join(",") }),
            ])

            setHistoryVideos(history.data.items);
            setLikedVideos(liked.data.items);
            setWatchLaterVideos(watchLater.data.items);
            setVideosLoading(false);
        }

        fetchData()
    }, [likedVideoIds, historyVideoIds, watchLaterVideoIds, savedDataLoading])

    return (
        <div className="self-start px-1 text-white w-full flex flex-col gap-6">
            <div id="history">
                {videosLoading ? <ShimmerUi />
                : <HorizontalCarousel
                        Card={VideoCard}
                        heading="History"
                        dataToMap={[...historyVideos].reverse()}
                    />}
            </div>

            <div id="likedVideos">
                {videosLoading ? <ShimmerUi />
                    : <HorizontalCarousel
                        Card={VideoCard}
                        heading="Liked Videos"
                        dataToMap={[...likedVideos].reverse()}
                    />}
            </div>

            <div id="watchLater">
                {videosLoading ? <ShimmerUi />
                    : <HorizontalCarousel
                        Card={VideoCard}
                        heading="Watch Later"
                        dataToMap={[...watchLaterVideos].reverse()}
                    />}
            </div>
        </div>
    )
}

export default SavedVideosSection