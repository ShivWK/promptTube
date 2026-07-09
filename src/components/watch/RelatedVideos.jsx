import { useGetCategoryVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import RelatedVideoCard from "./RelatedVideoCard";
import { selectCurrentPlaying } from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";
import RelatedVideoCardShimmer from "../shimmer/RelatedVideoCardShimmer";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useIsSmall from "../../hooks/useIsSmall";

const RelatedVideos = ({ categoryId: id, setVideoLoader }) => {
  const isSmall = useIsSmall();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetCategoryVideosInfiniteQuery(id);

  console.log("IsSmall", isSmall, hasNextPage)

  const loaderRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage && isSmall,
    threshold: 0.5,
    rootMargin: "300px"
  })

  let relatedVideos = [];

  if (!isLoading) {
    relatedVideos = data.pages.flatMap(page => page.items);
  }

  const currentVideo = useSelector(selectCurrentPlaying);
  const shimmerArray = Array.from({ length: 10 });

  return (
    <>
      <h2 className="dark:text-gray-200 text-xl font-medium mt-3 mb-4">Related Videos</h2>
      <div className="w-full">
        {isLoading
          ? <div className="flex flex-col gap-5 md:gap-4 w-full">
            {shimmerArray.map((_, index) => <RelatedVideoCardShimmer key={index} />)}
          </div>
          : <div className="flex flex-col gap-5 md:gap-4 w-full">
            {relatedVideos.map((video) => {
              if (video.id !== currentVideo.id) {
                return <RelatedVideoCard
                  key={video.id}
                  setVideoLoader={setVideoLoader}
                  object={video}
                  mode="related"
                  flexMode="flex-col md:flex-row"
                />
              }
            })}
            {isFetchingNextPage
              && shimmerArray.map((_, index) => <RelatedVideoCardShimmer key={index} />)
            }
            <div ref={loaderRef} className="h-0 w-0" />
          </div>}
      </div>
    </>
  )
}

export default RelatedVideos