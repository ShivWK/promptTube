import countViews from "../../utils/countViews";

const ChannelCard = ({ channel }) => {
    return (
        <div className="flex items-center gap-2 md:gap-3 dark:text-gray-100 rounded-md bg-gray-900 pr-3 p-2 cursor-pointer hover:bg-gray-700 active:bg-gray-700 transition=all duration-150 ease-linear">
           <img src={channel?.snippet?.thumbnails?.default?.url} alt="channel_logo" className="rounded-full h-11 md:h-13 w-11 md:w-13 border border-gray-400" />
            <div className="h-fit flex flex-col gap-1 pr-2">
                <h2 className="text-sm md:text-lg leading-5 tracking-wider max-w-40 md:max-w-[11rem] truncate">{channel?.snippet?.title}</h2>
                <p className="text-sm dark:text-gray-300">{countViews(channel?.statistics?.subscriberCount)}</p>
            </div>
        </div>
    )
}

export default ChannelCard;