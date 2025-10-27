import { selectHomeVideos, selectHomeLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { useEffect } from "react";

const Home = () => {
  const loading = useSelector(selectHomeLoading);
  const videos = useSelector(selectHomeVideos);
  // const data = useGetSearchVideosQuery({ searchedTerm: "John cena" })
  // console.log("searched data", data)

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("https://prompttube.onrender.com/api/v1/youtube/searchSuggestion?query=namestey javascript");
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (err) {
    //     console.log("failed", err)
    //   }
    // }

    // fetchData();
  }, [])

  return (
    <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
      {
        loading
          ? <p className="dark:text-white">Loading...</p>
          : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
            {
              videos.map(object => {
                return <VideoCard key={object.id} object={object} />
              })
            }
          </section>
      }
    </main>
  )
}

export default Home;