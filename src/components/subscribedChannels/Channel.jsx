import { useLazyGetChannelVideosQuery } from "../../features/watch/watchApiSlice";
import { selectCurrentChannel } from "../../features/watch/watchSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import countViews from "../../utils/countViews";
import calUploadTime from "../../utils/calUploadTime";
import useFetch from "../../hooks/useFetch";
import VideoCard from "../home/VideoCard";

const Channel = () => {
    const [triggerVideos, { isLoading }] = useLazyGetChannelVideosQuery();
    const currentChannel = useSelector(selectCurrentChannel);
    const uploadsId = currentChannel?.contentDetails?.relatedPlaylists?.uploads;

    const [ readMore, setReadMore ] = useState(false);
    const [ newUploads, setNewUploads ] = useState([]);

    useFetch({ trigger:triggerVideos, id:uploadsId, setState: setNewUploads, fetchWhat:"channel new uploads" })

    return (
        <main className="md:max-w-[1150px] md:mx-auto pt-20 md:pt-24 max-md:px-1 flex flex-col gap-5 md:gap-8 pb-12">
            <section className="relative">
                <img
                    src={currentChannel?.brandingSettings?.image?.bannerExternalUrl}
                    alt="banner Image"
                    className="w-full object-cover h-40 md:h-60 rounded-2xl"
                />
                <img
                    src={currentChannel?.snippet?.thumbnails?.default?.url}
                    alt="Channel thumbnail"
                    className="absolute left-[5%] -bottom-8 md:-bottom-11 rounded-full h-16 w-16 md:h-28 md:w-28 border border-gray-700"
                />
            </section>

            <section className="text-center text-white flex flex-col gap-1 md:gap-2.5">
                <h1 className="text-xl md:text-3xl font-bold tracking-wider">{currentChannel?.brandingSettings?.channel?.title}</h1>

                <div className="self-center flex items-center gap-2">
                    <span>{countViews(currentChannel?.statistics?.subscriberCount)} subscribers</span>
                    <span className="text-xl font-bold">·</span>
                    <span className="truncate max-md:max-w-52">Published {calUploadTime(currentChannel?.snippet?.publishedAt)}</span>
                </div>

                <p className={`text-sm md:text-lg tracking-wide ${!readMore && "line-clamp-3 md:line-clamp-4"}`}>{currentChannel?.brandingSettings?.channel?.description}</p>
            </section>

            <h2 className="text-white text-center font-medium tracking-wide text-xl md:text-2xl">Videos</h2>
            <section className="flex items-center gap-4 flex-wrap">
                {isLoading ? <p>Loading...</p>
                : newUploads.map((video) => <VideoCard key={video.id} object={video} mode="channel" />)}
            </section>
        </main>
    )
}

export default Channel;