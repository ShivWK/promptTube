import { selectHomeVideos, selectHomeLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { useEffect } from "react";
import DotBounceLoader from "../common/DotBounceLoader";

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
          ? <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
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