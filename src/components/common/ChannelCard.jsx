import { setCurrentChannel } from "../../features/watch/watchSlice";
import { addToLocalStorage } from "../../utils/handleLocalStorage";
import countViews from "../../utils/countViews";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ChannelCard = ({ object }) => {
    // console.log(object)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cardClickHandler = () => {
        const uploadsPlayListId = object?.contentDetails?.relatedPlaylists?.uploads;
        navigate(`/channel?channelId=${object.id}&uploadsId=${uploadsPlayListId}`);

        dispatch(setCurrentChannel(object));
        addToLocalStorage({ add: object, name: "currentChannel" })
    }

    return (
        <div onClick={cardClickHandler} className="flex shrink-0 items-center gap-2 md:gap-3 dark:text-gray-100 rounded-lg bg-gray-900 md:pr-3 p-2 cursor-pointer hover:bg-gray-700 active:bg-gray-700 transition=all duration-150 ease-linear">
           <img src={object?.snippet?.thumbnails?.default?.url} alt="channel_logo" className="rounded-full h-11 md:h-13 w-11 md:w-13 border border-gray-400" />
            <div className="h-fit flex flex-col gap-1 md:pr-2">
                <h2 className="text-sm md:text-lg leading-5 tracking-wider max-w-38 md:max-w-[11rem] truncate">{object?.snippet?.title}</h2>
                <p className="text-sm dark:text-gray-300">{countViews(object?.statistics?.subscriberCount)}</p>
            </div>
        </div>
    )
}

export default ChannelCard;