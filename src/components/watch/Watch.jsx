import { useSearchParams } from "react-router-dom";
import { selectCurrentPlaying } from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import { CircleUserRound } from "lucide-react";
import Comment from "./Comment";

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
  const [showCompleteComment, setShowCompleteComment] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await Promise.all([
          triggerCategory({ id: categoryId }).unwrap(),
          triggerComments({ videoId: id }).unwrap(),
          triggerChannel({ channelId }).unwrap(),
        ])

        const [relatedVideos, comments, channel] = result;

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

  const hideButtonClickHandler = (e) => {
    e.stopPropagation();
    setShowCompleteComment(false)
  }

  return (
    <main className='pt-16 lg:pt-24 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between max-w-[1300px] mx-auto'>
      <section className='basis-full md:basis-[61%]'>
        <div className='w-full lg:rounded-2xl overflow-hidden md:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)]'>
          <div className="relative h-[14rem] md:h-[28rem] w-full">
            <iframe onLoad={() => setShowVideoLoader(false)} className='h-full w-full rounded-md overflow-hidden aspect-video' src={`https://www.youtube.com/embed/${id}?si=miUcucQjdj2mjmo3`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {
              showVideoLoader && <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex items-center justify-center">
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
                <p className="max-md:text-xs dark:text-gray-300">{channel[0]?.statistics?.subscriberCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
              <div className="">
                {true ? <i className="ri-thumb-up-line text-xl md:text-2xl dark:text-white"></i>
                  : <i className="ri-thumb-up-fill text-xl md:text-2xl dark:text-primary"></i>}
              </div>
              <div>
                {true ? <i class="ri-time-line text-xl md:text-2xl dark:text-white" />
                  : <i class="ri-time-fill text-xl md:text-2xl dark:text-primary" />
                }
              </div>
              <button className="px-2 md:px-3 py-0.5 md:py-1 rounded bg-primary text-white tracking-wide ">
                Subscribe
              </button>
            </div>
          </div>

          {/* Comments */}
          <div onClick={() => setShowCompleteComment(true)} className={`relative w-full rounded-md transition-all duration-150 ease-linear dark:bg-gray-800 p-2 pb-1 dark:text-gray-200 mt-1 pretty-scrollbar ${showCompleteComment ? "overflow-auto" : "overflow-hidden cursor-pointer"}`}>

            {showCompleteComment && <div className="flex items-center gap-2 md:gap-3 mb-2 bg-gray-800 w-full">
              <CircleUserRound size={isSmall ? 55 : 55} strokeWidth={1} className="dark:text-primary" />
              <div className="bg-gray-900 w-full mx-auto flex items-center justify-between rounded-4xl overflow-hidden border border-gray-700">
                <input className="outline-none border-none w-full py-1 md:py-1.5 pl-3 pr-1.5" placeholder="type your comment..."></input>
                <button className="bg-primary self-stretch flex items-center justify-center">
                  <i className="ri-send-plane-2-fill px-3 py-1 md:py-1.5 text-2xl md:text-2xl"></i>
                </button>
              </div>
            </div>}

            <div className={`${showCompleteComment && "max-md:max-h-[25rem] md:h-auto overflow-auto"} pretty-scrollbar`}>
              <h2 className="text-sm md:text-sm">
                <span className="font-medium">Comments</span>
                {" "}
                <span className="text-gray-400">{comments.length}</span>
              </h2>

              {!showCompleteComment && <Comment data={comments[0]?.snippet?.topLevelComment.snippet} />}

              {showCompleteComment && <div>
                {comments.map((comment, index) => <Comment key={index} data={comment?.snippet?.topLevelComment.snippet} />)}
              </div>}
            </div>
            <button onClick={hideButtonClickHandler} className={`${showCompleteComment ? "block md:hidden" : "hidden"} mx-auto text-blue-400 text-sm font-medium pt-2`}>Hide comments</button>
          </div>
        </div>
      </section>
      <section className='basis-full md:basis-[36%] max-md:px-2'>
        <p className="text-white">{currentVideo.snippet.title}.</p>
      </section>
    </main>
  )
}

export default Watch;