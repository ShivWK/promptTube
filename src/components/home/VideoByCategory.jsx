import DotBounceLoader from "../common/DotBounceLoader";
import VideoCard from "./VideoCard";
import { useGetCategoryVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import { useSearchParams } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";
import { useSelector } from "react-redux";
import { selectIsSmall } from "../../features/home/homeSlice";

const VideoByCategory = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const shimmerArray = new Array(10).fill(0);

    const isSmall = useSelector(selectIsSmall);

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useGetCategoryVideosInfiniteQuery(categoryId);

    const loaderRef = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage && !isFetchingNextPage,
        threshold: 0.5,
        rootMargin: "300px"
    })

    let videos = [];

    if (!isLoading) {
        videos = data.pages.flatMap(page => page.items);
    }

    return (
        <main className="pt-28 lg:pt-36 md:pl-32 p-2 md:p-3">
            {
                (isLoading || isFetching)
                    ? <div
                        className={`flex flex-wrap ${isSmall
                            ? "gap-4"
                            : "gap-5 xl:gap-6"
                            }`}
                    >
                        {shimmerArray.map((_, index) => (
                            <VideoCardShimmer key={index} />
                        ))}
                    </div>
                    : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
                        {
                            videos.map(object => {
                                return <VideoCard key={object.id.videoId} object={object} mode="category" />
                            })
                        }
                        {isFetchingNextPage && shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
                        <div ref={loaderRef} className="h-0 w-0" />
                    </section>
            }
        </main>
    )
}

export default VideoByCategory;