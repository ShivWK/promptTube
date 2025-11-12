import { useNavigate } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";
import { useDispatch, useSelector } from "react-redux";
import { manageHistory, setCurrentPlaying, addVideo } from "../../features/watch/watchSlice";
import { addToLocalStorage } from "../../utils/handleLocalStorage";
import useAuthCheck from "../../hooks/useAuthCheck";
import { selectUserDetails } from "../../features/auth/authSlice";

const VideoCard = ({ object, mode = "search", flexMode="flex-col" }) => {
    const videoId = mode === "search" ? object.id.videoId : object.id;
    const [ _, checkAuth ] = useAuthCheck({ showToast: false });
    const { id } = useSelector(selectUserDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(object)

    const handleLinkClick = () => {
        navigate(`/watch?id=${videoId}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId || 1}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })

        dispatch(setCurrentPlaying(object));
        dispatch(manageHistory({ mode: "add", videoId}));
        
        if (checkAuth()) {
            dispatch(addVideo({ method: "PATCH", userId: id, videoType: "history", videoId }));
        }
        addToLocalStorage({name: "currentPlayingVideo", add: object});
    }

    return (
        <div onClick={handleLinkClick} className={` basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex ${flexMode} items-center self-start dark:bg-gray-900 transform hover:scale-105 transition-all duration-150 ease-linear`}>
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
        </div>
    )
}

export default VideoCard;
 
