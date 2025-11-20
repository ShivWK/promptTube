import { selectSearchResult, selectSearchLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import VideoCard from "../home/VideoCard";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";

const PcSearchPage = () => {
    const searchResult = useSelector(selectSearchResult);
    const isLoading = useSelector(selectSearchLoading);
    const shimmerArray = Array.from({ length: 15 });

    return (
        <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
            {
                isLoading
                    ? <div className="flex items-center gap-5 xl:gap-6 flex-wrap">
                        {shimmerArray.map((_, index) => <VideoCardShimmer key={index} />)}
                    </div>
                    : <section className="flex items-center gap-5 xl:gap-6 flex-wrap">
                        {
                            searchResult.map(object => {
                                return <VideoCard key={object.id.videoId} object={object} mode="search" />
                            })
                        }
                    </section>
            }
        </main>
    )
}

export default PcSearchPage