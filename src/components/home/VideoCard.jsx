import { Link } from "react-router-dom";

const VideoCard = ({ object, calUploadTime, countViews }) => {
    return (
        <Link to={`/watch?id=${object.id}`} key={object.id} className=" basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex flex-col items-center self-start dark:bg-gray-900">
            <img
                alt="thumbnail"
                src={object.snippet.thumbnails?.high?.url}
                className="w-full object-cover self-start rounded-2xl aspect-video"
                
            ></img>
            <div className="p-2 dark:text-white w-full flex flex-col gap-1">
                <h2 className="text-start font-medium tracking-wide line-clamp-2 leading-5">{object.snippet?.localized?.title}</h2>
                <p className="text-sm dark:text-gray-300">{object.snippet?.channelTitle}</p>
                <div className="text-sm flex items-center gap-1.5 dark:text-gray-300 -mt-1.5">
                    <span>{`${countViews(object.statistics?.viewCount)} views`}</span>
                    <span className="text-xl font-bold">·</span>
                    <span>{calUploadTime(object.snippet?.publishedAt)}</span>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard;

// comments "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=[video_id]&maxResults=20&order=relevance&key=[API_KEY]"