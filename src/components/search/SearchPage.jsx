import { selectSearchResult, selectSearchLoading } from "../../features/home/homeSlice";
import { selectSearchResults } from "../../features/search/searchSlice";
import VideoCard from "../home/VideoCard";
import { useSelector } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";

const SearchPage = () => {
  const searchResult = useSelector(selectSearchResult);
  const isLoading = useSelector(selectSearchLoading);

  return (
    <main className="pt-14">
      {isLoading ? <div className="flex items-center justify-center absolute top-0 left-0 w-full h-[110%]">
        <DotBounceLoader
          fourth={true}
          allColor={"text-primary"}
          mdSize="md:text-5xl"
          nmSize="text-3xl"
        />
      </div>
        : searchResult.length !== 0 && <section className="flex flex-col gap-3 px-2 py-4 -z-20 pt-20">
          {searchResult.map((video) => <VideoCard object={video} key={video.id.videoId} mode="search" />)}
        </section>}
    </main>
  )
}

export default SearchPage;