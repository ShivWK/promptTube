import { useGetCategoryVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import RelatedVideoCard from "./RelatedVideoCard";
import RelatedVideoCardShimmer from "../shimmer/RelatedVideoCardShimmer";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useIsSmall from "../../hooks/useIsSmall";
import { useSearchParams } from "react-router-dom";

const RelatedVideos = ({ categoryId: id, setVideoLoader }) => {
  const [searchParam] = useSearchParams();
  const currentPlaying = searchParam.get("id");

  const isSmall = useIsSmall();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetCategoryVideosInfiniteQuery(id);

  const loaderRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage && isSmall,
    threshold: 0.5,
    rootMargin: "300px",
  });

  const relatedVideos = data?.pages?.flatMap((page) => page.items ?? []) ?? [];

  const filteredVideos = relatedVideos.filter(
    (video) => video.id !== currentPlaying
  );

  const shimmerArray = Array.from({ length: 10 });

  return (
    <>
      <h2 className="dark:text-gray-200 text-xl font-medium mt-3 mb-4">
        Related Videos
      </h2>

      <div className="w-full">

        {isLoading && (
          <div className="flex flex-col gap-5 md:gap-4 w-full">
            {shimmerArray.map((_, index) => (
              <RelatedVideoCardShimmer key={index} />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="py-8 text-center text-gray-500">
            Unable to load related videos.
          </div>
        )}

        {!isLoading && !isError && filteredVideos.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No related videos available.
          </div>
        )}

        {!isLoading && !isError && filteredVideos.length > 0 && (
          <div className="flex flex-col gap-5 md:gap-4 w-full">

            {filteredVideos.map((video) => (
              <RelatedVideoCard
                key={video.id}
                setVideoLoader={setVideoLoader}
                object={video}
                mode="related"
                flexMode="flex-col md:flex-row"
              />
            ))}

            {isFetchingNextPage &&
              shimmerArray.map((_, index) => (
                <RelatedVideoCardShimmer key={index} />
              ))
            }

            <div ref={loaderRef} className="h-0 w-0" />
          </div>
        )}

      </div>
    </>
  );
};

export default RelatedVideos