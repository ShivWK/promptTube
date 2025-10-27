import { selectSearchResult, selectSearchLoading } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import VideoCard from "../home/VideoCard";

const PcSearchPage = () => {
    const searchResult = useSelector(selectSearchResult);
    const isLoading = useSelector(selectSearchLoading);

    return (
        <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
            {
                isLoading
                    ? <p className="dark:text-white">Loading...</p>
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