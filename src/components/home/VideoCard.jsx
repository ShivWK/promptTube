import { Link } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";

const VideoCard = ({ object, mode = "search" }) => {
    return (
        <Link to={`/watch?id=${mode === "search" ? object.id.videoId : object.id}`} className=" basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex flex-col items-center self-start dark:bg-gray-900">
            <img
                alt="thumbnail"
                src={object.snippet.thumbnails?.high?.url}
                className="w-full object-cover self-start rounded-t-2xl aspect-video"

            ></img>
            <div className="p-2 dark:text-white w-full flex flex-col gap-1">
                <h2 className="text-start font-medium tracking-wide line-clamp-2 leading-5">{mode === "search" ?
                    object.snippet?.title
                    : object.snippet?.localized?.title}</h2>
                <p className="text-sm dark:text-gray-300">{object.snippet?.channelTitle}</p>
                <div className="text-sm flex items-center gap-1.5 dark:text-gray-300 -mt-1.5">
                    {mode !== "search" && <>
                        <span>{`${countViews(object.statistics?.viewCount)} views`}</span>
                        <span className="text-xl font-bold">·</span>
                    </>}
                    <span>{calUploadTime(object.snippet?.publishedAt)}</span>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard;

// comments "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=[video_id]&maxResults=20&order=relevance&key=[API_KEY]"

// Video by id: curl
//   'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]' 
