import { Link } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";
import { useDispatch } from "react-redux";
import { setCurrentPlaying } from "../../features/watch/watchSlice";
import { addToLocalStorage } from "../../utils/handleLocalStorage";

const VideoCard = ({ object, mode = "search", flexMode="flex-col" }) => {
    const dispatch = useDispatch();

    const handleLinkClick = () => {
        dispatch(setCurrentPlaying(object));
        addToLocalStorage({name: "currentPlayingVideo", add: object});
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Link onClick={handleLinkClick} to={`/watch?id=${mode === "search" ? object.id.videoId : object.id}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId}`} className={` basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex ${flexMode} items-center self-start dark:bg-gray-900 transform hover:scale-105 transition-all duration-150 ease-linear`}>
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
 
