import { selectHomeVideos } from "../../features/home/homeSlice";
import VideoCard from "./VideoCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";

const Home = () => {
  const { value:videos, loading } = useSelector(selectHomeVideos);
  const shimmerArray = Array.from({ length: 15 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=PssKpzB0Ah0&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
        const data = await response.text();
        console.log(data);
      } catch (err) {
        console.log("failed", err)
      }
    }

    // fetchData();
  }, [])

  return (
    <main className="pt-28 lg:pt-36 md:pl-32 p-2 md:p-3">
      {
        loading
          ? <div className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
          </div>
          : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {videos.map(object => {
              return <VideoCard key={object.id} object={object} mode="home" />
            })}
          </section>
      }
    </main>
  )
}

export default Home;