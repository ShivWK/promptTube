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

    const isSmall = useSelector(selectIsSmall);
    const dispatch = useDispatch();

    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetSearchInfiniteVideosInfiniteQuery(searchTerm, {
        skip: !searchTerm,
    });

    useEffect(() => {
        dispatch(setSearchLoading(isLoading || isFetching));
    }, [dispatch, isFetching, isLoading]);

    const loaderRef = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage && !isFetchingNextPage,
        threshold: 0.5,
        rootMargin: "300px",
    });

    const searchResult =
        data?.pages?.flatMap((page) => page.items) ?? [];

    const shimmerArray = Array.from({ length: 15 });

    return (
        <main
            className={
                isSmall
                    ? "pt-14"
                    : "pt-32 lg:pt-40 md:pl-32 p-3"
            }
        >
            {isLoading ? (
                <div
                    className={
                        isSmall
                            ? "flex flex-col gap-4 pt-22 px-2 pb-4"
                            : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6"
                    }
                >
                    {shimmerArray.map((_, index) => (
                        <VideoCardShimmer key={index} />
                    ))}
                </div>
            ) : (
                <section
                    className={
                        isSmall
                            ? "flex flex-col gap-4 pt-22 px-2 pb-4"
                            : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6"
                    }
                >
                    {searchResult.map((video) => (
                        <VideoCard
                            key={video.id.videoId}
                            object={video}
                            mode="search"
                        />
                    ))}

                    {isFetchingNextPage &&
                        shimmerArray.map((_, index) => (
                            <VideoCardShimmer key={`loading-${index}`} />
                        ))}

                    <div ref={loaderRef} className="h-px col-span-full" />
                </section>
            )}
        </main>
    );
};

export default SearchPage;