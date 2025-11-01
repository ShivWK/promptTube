import { useNavigate } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";
import { setCurrentPlaying } from "../../features/watch/watchSlice";
import { useDispatch } from "react-redux";
import { addToLocalStorage } from "../../utils/handleLocalStorage";

const RelatedVideoCard = ({ object, mode="search", setVideoLoader }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleVideoClick = () => {
        dispatch(setCurrentPlaying(object));
        setVideoLoader(true)

        navigate(`/watch?id=${mode === "search" ? object.id.videoId : object.id}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId}`);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        addToLocalStorage({name: "currentPlayingVideo", add: object});
    }

    return (
        <div onClick={handleVideoClick} className={`rounded-2xl overflow-hidden flex flex-col md:flex-row self-start dark:bg-gray-900 transform hover:scale-105 transition-all duration-150 ease-linear md:h-36 h-auto w-full cursor-pointer`}>
            <img
                alt="thumbnail"
                src={object.snippet.thumbnails?.high?.url}
                className="w-full object-cover self-start max-md:rounded-t-2xl aspect-video md:w-60 md:h-full"
            ></img>
            <div className="p-2 dark:text-white w-full flex flex-col gap-1">
                <h2 className="text-start font-medium tracking-wide md:text line-clamp-2 break-all hyphens-auto leading-5">{mode === "search" ?
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
        </div>
    )
}

export default RelatedVideoCard;