import { setCurrentPlaying } from "../../features/watch/watchSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ object }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cardClickHandler = () => {
    navigate(`/watch?id=${object.id}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    dispatch(setCurrentPlaying(object));
  }

  return (
    <div onClick={cardClickHandler} className="flex shrink-0 h-60 w-72 flex-col gap-1 bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-150 ease-linear border border-gray-900">
      <img
        alt="thumbnail"
        src={object.snippet.thumbnails?.high?.url}
        className="w-full object-cover self-start aspect-video"
      ></img>
      <div className="py-1 px-2 dark:text-white w-full flex flex-col gap-1">
        <h2 className="text-start font-medium text-sm tracking-wide line-clamp-2 leading-5">
          {object.snippet?.localized?.title}
        </h2>
        <p className="text-sm dark:text-gray-300">{object.snippet?.channelTitle}</p>
      </div>

    </div>
  )
}

export default VideoCard;