import VideoCard from "./VideoCard";
import { useEffect } from "react";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";
import { useGetPopularVideosInfiniteQuery } from "../../features/home/homeApiSlice";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  } = useGetPopularVideosInfiniteQuery(undefined);

  const loaderRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 0.5,
    rootMargin: "300px"
  })

  const shimmerArray = Array.from({ length: 15 });
  let videos =  [];

  if (!isLoading) {
    videos = data.pages.flatMap(page => page.items);
  }

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);

    //     const data = await response.json();
    //     console.log(data);
    //   } catch (err) {
    //     console.log("failed", err)
    //   }
    // }

    // fetchData();
  }, [])

  return (
    <main className="pt-28 lg:pt-36 md:pl-32 p-2 md:p-3">
      {
        isLoading
          ? <div className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
          </div>
          : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {videos.map(object => {
              return <VideoCard key={object.id} object={object} mode="home" />
            })}

            {isFetchingNextPage && shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
            <div ref={loaderRef} className="h-0 w-0" />
          </section>
      }
    </main>
  )
}

export default Home;