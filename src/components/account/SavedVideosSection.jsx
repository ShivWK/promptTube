import { selectLikedVideos, selectHistory, selectWatchLater } from "../../features/watch/watchSlice";
import { useLazyGetVideoByIdQuery } from "../../features/watch/watchApiSlice";
import { selectSavedDataLoading } from "../../features/home/homeSlice";
import { useState, useEffect, useRef } from "react";
import HistoryVideoCard from "./HistoryVideoCard";
import { useSelector } from "react-redux";
import HorizontalCarousel from "../common/HorizontalCarousel";

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
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const containerRef = useRef(null);

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
        <div className="self-start p-4 text-white w-full flex flex-col gap-6">
            {videosLoading ? <p>Loading...</p>
                : <HorizontalCarousel
                    Card={HistoryVideoCard}
                    heading="History"
                    dataToMap={historyVideos}
                />}

            {videosLoading ? <p>Loading...</p>
                : <HorizontalCarousel
                    Card={HistoryVideoCard}
                    heading="Liked Videos"
                    dataToMap={likedVideos}
                />}

            {videosLoading ? <p>Loading...</p>
                : <HorizontalCarousel
                    Card={HistoryVideoCard}
                    heading="Watch Later"
                    dataToMap={watchLaterVideos}
                />}
        </div>
    )
}

export default SavedVideosSection