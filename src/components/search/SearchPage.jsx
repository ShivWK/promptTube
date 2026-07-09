import { selectIsSmall, setSearchLoading } from "../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../home/VideoCard";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";
import { useGetSearchInfiniteVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
    const [searchParam] = useSearchParams();
    const searchTerm = searchParam.get("searchQuery");

    console.log("SearchTERM", searchTerm)

    const isSmall = useSelector(selectIsSmall);

    const dispatch = useDispatch();

    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useGetSearchInfiniteVideosInfiniteQuery(
        searchTerm,
        {
            skip: !searchTerm
        }
    );

    useEffect(() => {
        dispatch(setSearchLoading(isLoading || isFetching))
    }, [isFetching, isLoading, dispatch])

    const loaderRef = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage && !isFetchingNextPage,
        threshold: 0.5,
        rootMargin: "300px"
    })

    let searchResult = [];

    if (!isLoading && data?.pages) {
        searchResult = data?.pages.flatMap(page => page.items)
    }

    const shimmerArray = Array.from({ length: 15 });

    return (
        <main className={isSmall
            ? "pt-14"
            : "pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3"
        }>
            {isLoading
                ? <div className={`flex items-center flex-wrap ${isSmall
                    ? "gap-4 pt-22 px-2 py-4"
                    : "gap-5 xl:gap-6"}`
                }>
                    {shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
                </div>
                : searchResult.length !== 0 &&
                <section className={`flex ${isSmall
                    ? "flex-col gap-4 px-2 py-4 -z-20 pt-22"
                    : "items-center flex-wrap gap-5 xl:gap-6"}`
                }>
                    {searchResult.map((video) => (
                        <VideoCard
                            key={video.id.videoId}
                            object={video}
                            mode="search"
                        />
                    ))}
                    <div ref={loaderRef} className="h-0 w-0" />
                    {isFetchingNextPage &&
                        shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
                </section>}
        </main>
    )
}

export default SearchPage