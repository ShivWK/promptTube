import { setCurrentPlaying } from "../../features/watch/watchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useRemoveSavedVideoMutation } from "../../features/userActivity/userActivityApiSlice";
import { selectUserDetails } from "../../features/auth/authSlice";

const VideoCard = ({ object, videoType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [removeVideo, { isLoading: isRemoving }] =
    useRemoveSavedVideoMutation();

  const { id: userId } = useSelector(selectUserDetails);

  const cardClickHandler = () => {
    if (isRemoving) return;

    navigate(`/watch?id=${object.id}&channelid=${object.snippet.channelId}&categoryid=${object.snippet.categoryId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(setCurrentPlaying(object));
  };

  const removeVideoHandler = (e) => {
    // Don't trigger cardClickHandler
    e.stopPropagation();

    if (isRemoving) return;

    removeVideo({
      userId,
      videoId: object.id,
      videoType,
    });
  };

  return (
    <div
      onClick={cardClickHandler}
      className="relative flex shrink-0 h-60 w-72 flex-col gap-1 bg-gray-900 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-150 ease-linear border border-gray-900"
    >
      <img
        alt="thumbnail"
        src={object.snippet.thumbnails?.high?.url}
        className="w-full object-cover self-start aspect-video"
      />

      {/* Remove button */}
      {videoType && (
        <button
          onClick={removeVideoHandler}
          disabled={isRemoving}
          title={`Remove from ${videoType}`}
          className="absolute top-2 right-2 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2
            size={17}
            className={isRemoving ? "animate-pulse" : ""}
          />
        </button>
      )}

      <div className="py-1 px-2 dark:text-white w-full flex flex-col gap-1">
        <h2 className="text-start font-medium text-sm tracking-wide line-clamp-2 leading-5">
          {object.snippet?.localized?.title}
        </h2>

        <p className="text-sm dark:text-gray-300">
          {object.snippet?.channelTitle}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;