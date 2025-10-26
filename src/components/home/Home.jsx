import { selectHomeVideos, selectHomeLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { useEffect } from "react";

const Home = () => {
  const loading = useSelector(selectHomeLoading);
  const videos = useSelector(selectHomeVideos);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://prompttube.onrender.com/api/v1/youtube/searchSuggestion?query=john");
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log("failed", err)
      }
    }

    fetchData();
  }, [])

  const countViews = (view) => {
    if (view > 1_000_000) {
      return (view / 1_000_000).toFixed(0) + "M";
    } else if (view > 1_000) {
      return (view / 1_000).toFixed(1) + "K";
    } else {
      return view;
    }
  }

  const calUploadTime = (time) => {
    const today = new Date();
    const publishedDate = new Date(time);
    const seconds = Math.floor(today - publishedDate);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    }

    if (seconds < 60) return "just now"

    for (let [key, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);

      if (count >= 1) {
        return `${count} ${key}${count > 1 ? "s" : ""} ago`
      }
    }
  }

  return (
    <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
      {
        loading
          ? <p className="dark:text-white">Loading...</p>
          : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {
              videos.map(object => {
                return <VideoCard key={object.id} object={object} calUploadTime={calUploadTime} countViews={countViews} />
              })
            }
          </section>
      }
    </main>
  )
}

export default Home;