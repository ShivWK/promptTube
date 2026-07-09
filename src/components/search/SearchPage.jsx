import { selectIsSmall, setSearchLoading } from "../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../home/VideoCard";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";
import { useGetSearchInfiniteVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SearchX } from "lucide-react";

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
                    : "pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3"
            }
        >
            {/* Initial State */}
            {!searchTerm && (
                <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center text-white max-md:mt-20 md:-ml-32">
                    <Search size={70} className="text-primary mb-5" />

                    <h2 className="text-3xl font-semibold">
                        Search Videos
                    </h2>

                    <p className="mt-3 max-w-md text-gray-400">
                        Search for tutorials, music, podcasts, gaming,
                        technology, movies and millions of other videos.
                    </p>

                    <p className="mt-6 text-sm text-gray-500">
                        Start by typing something in the search bar above.
                    </p>
                </div>
            )}

            {/* Loading */}
            {searchTerm && isLoading && (
                <div
                    className={`flex flex-wrap  ${isSmall
                        ? "gap-4 px-2 py-4 pt-22"
                        : "gap-5 xl:gap-6"
                        }`}
                >
                    {shimmerArray.map((_, index) => (
                        <VideoCardShimmer key={index} />
                    ))}
                </div>
            )}

            {/* No Results */}
            {searchTerm && !isLoading && searchResult.length === 0 && (
                <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center text-white max-md:mt-20 md:-ml-32">
                    <SearchX size={70} className="text-gray-500 mb-5" />

                    <h2 className="text-3xl font-semibold">
                        No videos found
                    </h2>

                    <p className="mt-3 text-gray-400">
                        We couldn't find any videos for
                    </p>

                    <p className="mt-2 text-lg font-medium text-primary break-all">
                        "{searchTerm}"
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-gray-500">
                        <p>• Check your spelling</p>
                        <p>• Try different keywords</p>
                        <p>• Use shorter or broader search terms</p>
                    </div>
                </div>
            )}

            {/* Results */}
            {searchTerm &&
                !isLoading &&
                searchResult.length > 0 && (
                    <section
                        className={`flex flex-wrap  ${isSmall
                            ? "gap-4 px-2 py-4 pt-22"
                            : "gap-5 xl:gap-6"
                            }`}
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
                                <VideoCardShimmer key={index} />
                            ))}

                        <div ref={loaderRef} className="h-0 w-0" />
                    </section>
                )}
        </main>
    );
};

export default SearchPage;