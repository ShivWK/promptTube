import DotBounceLoader from "../common/DotBounceLoader";
import VideoCard from "./VideoCard";
import { useGetCategoryVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import { useSearchParams } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";

const VideoByCategory = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const shimmerArray = new Array(10).fill(0);

    const {
        data,
        isLoading,
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
                isLoading
                    ? <div className="flex items-center justify-center absolute top-0 left-0 w-full h-[110%]">
                        <DotBounceLoader
                            fourth={true}
                            color1="text-primary"
                            color2="text-primary"
                            color3="text-primary"
                            color4="text-primary"
                            mdSize="md:text-5xl"
                            nmSize="text-3xl"
                        />
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