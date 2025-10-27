import SearchBar from "../layout/header/SearchBar";
import { selectSearchResult } from "../../features/home/homeSlice";
import VideoCard from "../home/VideoCard";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const searchResult = useSelector(selectSearchResult);

  return (
    <main className="pt-14">
      <div className="fixed flex items-center justify-center w-full h-18 bg-black/60 backdrop-blur-2xl rounded-b-2xl">
        <section className="mx-auto w-[90%]">
          <SearchBar />
        </section>
      </div>

      {searchResult.length !== 0 && <section className="flex flex-col gap-3 px-2 py-4 -z-20 pt-20">
        {searchResult.map((video) => <VideoCard object={video} key={video.id.videoId} />)}
      </section>}
    </main>
  )
}

export default SearchPage;