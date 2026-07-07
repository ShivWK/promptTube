import { selectLikedVideos, selectHistory, selectWatchLater } from "../../features/watch/watchSlice";
import { useLazyGetVideoByIdQuery } from "../../features/watch/watchApiSlice";
import { selectSavedDataLoading } from "../../features/home/homeSlice";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";
import SavedVideoShimmerCard from "../shimmer/SavedVideoShimmerCard";

const ShimmerUi = () => {
    const shimmerArray = Array.from({ length: 3 });

    return (
        <div className="self-start w-full px-1 text-white flex flex-col gap-6">
            {[1,2,3].map((section) => (
                <div key={section} className="flex flex-col gap-4 md:gap-6">
                    <div className="h-6 w-30 rounded animate-shimmer-bg md:h-7" />

                    <div className="scrollbar-hide flex gap-3 overflow-auto">
                        {shimmerArray.map((_, index) => (
                            <SavedVideoShimmerCard key={index} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
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
                triggerVideos({ id: historyVideoIds.join(",") }, true),
                triggerVideos({ id: watchLaterVideoIds.join(",") }, true),
                triggerVideos({ id: likedVideoIds.join(",") }, true),
            ])

            setHistoryVideos(history.data.items);
            setLikedVideos(liked.data.items);
            setWatchLaterVideos(watchLater.data.items);
            setVideosLoading(false);
        }

        fetchData()
    }, [likedVideoIds, historyVideoIds, watchLaterVideoIds, savedDataLoading, triggerVideos])

    if (videosLoading) {
        return <ShimmerUi />;
    }

    const isEmpty =
        historyVideos.length === 0 &&
        likedVideos.length === 0 &&
        watchLaterVideos.length === 0;

    if (isEmpty) {
        return (
            <div className="flex max-md:min-h-[40vh] h-full flex-col items-center justify-center gap-3 px-4 text-center text-gray-400">
                <h2 className="text-xl font-semibold text-white">
                    No saved videos yet
                </h2>
                <p className="max-w-md text-sm">
                    Videos you watch, like, or save to Watch Later will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="self-start flex w-full flex-col gap-6 px-1 text-white">
            {historyVideos.length > 0 && (
                <div id="history">
                    <HorizontalCarousel
                        Card={VideoCard}
                        heading="History"
                        dataToMap={[...historyVideos].reverse()}
                    />
                </div>
            )}

            {likedVideos.length > 0 && (
                <div id="likedVideos">
                    <HorizontalCarousel
                        Card={VideoCard}
                        heading="Liked Videos"
                        dataToMap={[...likedVideos].reverse()}
                    />
                </div>
            )}

            {watchLaterVideos.length > 0 && (
                <div id="watchLater">
                    <HorizontalCarousel
                        Card={VideoCard}
                        heading="Watch Later"
                        dataToMap={[...watchLaterVideos].reverse()}
                    />
                </div>
            )}
        </div>
    );
}

export default SavedVideosSection