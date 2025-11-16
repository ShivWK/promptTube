import { selectSearchResult, selectSearchLoading } from "../../features/home/homeSlice";
import VideoCard from "../home/VideoCard";
import { useSelector } from "react-redux";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";

const SearchPage = () => {
  const searchResult = useSelector(selectSearchResult);
  const isLoading = useSelector(selectSearchLoading);
  const shimmerArray = Array.from({ length: 10 });

  return (
    <main className="pt-14">
      {isLoading ? <div className="flex items-center gap-4 flex-wrap pt-22 px-2 py-4">
            {shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
          </div>
        : searchResult.length !== 0 && <section className="flex flex-col gap-4 px-2 py-4 -z-20 pt-22">
          {searchResult.map((video) => <VideoCard object={video} key={video.id.videoId} mode="search" />)}
        </section>}
    </main>
  )
}

export default SearchPage;