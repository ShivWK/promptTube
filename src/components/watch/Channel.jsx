import { useLazyGetChannelDetailsQuery } from "../../features/watch/watchApiSlice";
import { useState } from "react";
import countViews from "../../utils/countViews";
import useFetch from "../../hooks/useFetch";

const Channel = ({ channelId: id }) => {
    const [trigger, { isLoading }] = useLazyGetChannelDetailsQuery();
    const [channel, setChannel] = useState([]);

    useFetch({ trigger, id, setState: setChannel, fetchWhat: "channel details" })

    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 dark:text-gray-100">
                {!isLoading && <img src={channel[0]?.snippet?.thumbnails?.default?.url} alt="channel_logo" className="rounded-full h-11 md:h-14 w-11 md:w-14 border border-gray-400" />}
                <div className="h-fit">
                    <h2 className="text-sm md:text-lg leading-5 font-medium tracking-wider max-w-40 md:max-w-[26rem] truncate">{channel[0]?.snippet?.title}</h2>
                    <p className="max-md:text-xs dark:text-gray-300">{countViews(channel[0]?.statistics?.subscriberCount)}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
                <div className="">
                    {true ? <i className="ri-thumb-up-line text-xl md:text-2xl dark:text-white cursor-pointer"></i>
                        : <i className="ri-thumb-up-fill text-xl md:text-2xl dark:text-primary cursor-pointer"></i>}
                </div>
                <div>
                    {true ? <i className="ri-time-line text-xl md:text-2xl dark:text-white cursor-pointer" />
                        : <i className="ri-time-fill text-xl md:text-2xl dark:text-primary cursor-pointer" />
                    }
                </div>
                <button className="px-2 md:px-3 py-0.5 md:py-1 rounded bg-primary text-white tracking-wide cursor-pointer">
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default Channel