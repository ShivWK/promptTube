import { useLazyGetPopularVideosQuery } from "../../features/home/homeApiSlice";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import VideoCardShimmer from "../common/VideoCardShimmer";

const Home = () => {
  const [triggerVideos, { isLoading }] = useLazyGetPopularVideosQuery();
  const [videos, setVideos] = useState([]);
  const shimmerArray = Array.from({ length: 15 });

  useEffect(() => {
    const popularVideosCall = async () => {
      try {
        const { items } = await triggerVideos().unwrap();
        setVideos(items)
      } catch (err) {
        console.log(err);
      }
    }

    popularVideosCall();
  }, [])

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
        isLoading
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