import { useNavigate } from "react-router-dom";
import calUploadTime from "../../utils/calUploadTime";
import countViews from "../../utils/countViews";

const RelatedVideoCard = ({ object, mode="search", flexMode="flex-col" }) => {
    const navigate = useNavigate();

    const handleVideoClick = () => {
        navigate(`/watch?id=${mode === "search" ? object.id.videoId : object.id}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId}`);
    }

    return (
        <div onClick={handleVideoClick} className={`rounded-2xl overflow-hidden flex ${flexMode} items-center self-start dark:bg-gray-900 transform hover:scale-105 transition-all duration-150 ease-linear h-36 w-full`}>
            <img
                alt="thumbnail"
                src={object.snippet.thumbnails?.high?.url}
                className="w-full object-cover self-start rounded-t-2xl aspect-video basis-[10%]"
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

export default RelatedVideoCard;