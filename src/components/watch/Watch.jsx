import { useSearchParams } from "react-router-dom";
import { selectCurrentPlaying } from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import { ThumbsUp, ClockArrowUp } from "lucide-react";

import {
  useLazyGetCommentsQuery,
  useLazyGetChannelDetailsQuery,
} from "../../features/watch/watchApiSlice";

import { useLazyGetCategoryVideosQuery } from "../../features/home/homeApiSlice";
import { selectIsSmall } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";

const Watch = () => {
  const [triggerComments] = useLazyGetCommentsQuery();
  const [triggerChannel] = useLazyGetChannelDetailsQuery();
  const [triggerCategory] = useLazyGetCategoryVideosQuery();
  const currentVideo = useSelector(selectCurrentPlaying);
  const isSmall = useSelector(selectIsSmall);

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const channelId = searchParam.get("channelid");
  const categoryId = searchParam.get("categoryid");

  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideoLoader, setShowVideoLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        // setLoading(true);
        const result = await Promise.all([
          triggerCategory({ id: categoryId }).unwrap(),
          triggerComments({ videoId: id }).unwrap(),
          triggerChannel({ channelId }).unwrap(),
        ])

        const [relatedVideos, comments, channel] = result;

        // console.log("vid", relatedVideos, "com", comments, "Ch", channel) 

        setChannel(channel.items);
        setComments(comments.items);
        setRelatedVideos(relatedVideos.items);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    getData()
  }, [])

  console.log(channel)

  return (
    <main className='pt-16 lg:pt-24 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between max-w-[1300px] mx-auto'>
      <section className='basis-full md:basis-[61%]'>
        <div className='w-full lg:rounded-2xl overflow-hidden md:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)]'>
          <div className="relative h-[14rem] md:h-[28rem] w-full">
            <iframe onLoad={() => setShowVideoLoader(false)} className='h-full w-full rounded-md overflow-hidden aspect-video' src={`https://www.youtube.com/embed/${id}?si=miUcucQjdj2mjmo3`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {
              showVideoLoader && <div className="w-full h-full bg-black/50 absolute top-0 left-0 flex items-center justify-center">
                <DotBounceLoader allColor={"text-primary"} mdSize="text-4xl" nmSize="text-2xl" fourth={true} />
              </div>
            }
          </div>
        </div>

        <div className="mt-2 md:mt-5 max-md:px-2 flex flex-col gap-2 md:gap-2.5 justify-center">
          <h1 className="dark:text-gray-200 md:text-xl font-medium line-clamp-2">{currentVideo?.snippet?.title}</h1>

          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 dark:text-gray-100">
              {!loading && <img src={channel[0].snippet?.thumbnails?.default?.url} alt="channel_logo" className="rounded-full h-11 md:h-14 w-11 md:w-14 border border-gray-400" />}
              <div className="h-fit">
                <h2 className="max-md:text-xs leading-5 font-medium tracking-wider max-w-40 md:max-w-[26rem] truncate">{channel[0]?.snippet?.title}</h2>
                <p className="max-md:text-xs font-medium dark:text-gray-300">{channel[0]?.statistics?.subscriberCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
              <div className="">
                { true ? <i className="ri-thumb-up-line text-xl md:text-2xl dark:text-white"></i>
                : <i className="ri-thumb-up-fill text-xl md:text-2xl dark:text-primary"></i>}
              </div>
              <div>
                {!true ? <i class="ri-time-line text-xl md:text-2xl dark:text-white" />
                : <i class="ri-time-fill text-xl md:text-2xl dark:text-primary" />
                }
              </div>
              <button className="px-2 md:px-3 py-0.5 md:py-1 rounded bg-primary text-white tracking-wide ">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='basis-full md:basis-[36%] max-md:px-2'>
        {/* <p className="text-white">{currentVideo.snippet.title}.</p> */}
      </section>
    </main>
  )
}

export default Watch;