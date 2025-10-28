import { useLazyGetPopularVideosQuery } from "../../features/home/homeApiSlice";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import DotBounceLoader from "../common/DotBounceLoader";

const Home = () => {
  const [triggerVideos, { isLoading }] = useLazyGetPopularVideosQuery();
  const [videos, setVideos] = useState([]);

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
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&topicId=/m/02vxn&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log("failed", err)
      }
    }

    fetchData();
  }, [])

  return (
    <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
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
            {videos.map(object => {
              return <VideoCard key={object.id} object={object} mode="home" />
            })}
          </section>
      }
    </main>
  )
}

export default Home;