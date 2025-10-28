import DotBounceLoader from "../common/DotBounceLoader";
import VideoCard from "./VideoCard";
import { selectCategoryVideos } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";

const VideoByCategory = () => {
    const { value, loading } = useSelector(selectCategoryVideos);

    return (
        <main className="pt-32 md:pt-32 lg:pt-40 md:pl-32 p-2 md:p-3">
            {
                loading
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
                        {
                            value.map(object => {
                                return <VideoCard key={object.id.videoId} object={object} mode="category" />
                            })
                        }
                    </section>
            }
        </main>
    )
}

export default VideoByCategory;