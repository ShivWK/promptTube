import { selectSearchResult } from "../../features/home/homeSlice";
import VideoCard from "../home/VideoCard";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const searchResult = useSelector(selectSearchResult);

  return (
    <main className="pt-14">
      {searchResult.length !== 0 && <section className="flex flex-col gap-3 px-2 py-4 -z-20 pt-20">
        {searchResult.map((video) => <VideoCard object={video} key={video.id.videoId} mode="search" />)}
      </section>}
    </main>
  )
}

export default SearchPage;