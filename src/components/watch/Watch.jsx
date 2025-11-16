import { useSearchParams } from "react-router-dom";
import { selectCurrentPlaying } from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";
import DotBounceLoader from "../common/DotBounceLoader";
import { useState } from "react";
import RelatedVideos from "./RelatedVideos";
import Channel from "./Channel";
import Comments from "./Comments";
import SummaryAndQA from "./SummaryAndQA";

const Watch = () => {
  const currentVideo = useSelector(selectCurrentPlaying);

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const channelId = searchParam.get("channelid");
  const categoryId = searchParam.get("categoryid");
  const [showVideoLoader, setShowVideoLoader] = useState(true);

  return (
    <main className='pt-16 pb-20 lg:pt-24 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between max-w-[1300px] mx-auto'>
      <section className='basis-full md:basis-[61%] self-start'>
        <div className='w-full lg:rounded-2xl overflow-hidden md:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)]'>
          <div className="relative h-[14rem] md:h-[28rem] w-full">
            <iframe onLoad={() => setShowVideoLoader(false)} className='h-full w-full rounded-md overflow-hidden aspect-video' src={`https://www.youtube.com/embed/${id}?si=miUcucQjdj2mjmo3`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            {showVideoLoader && <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex items-center justify-center">
              <DotBounceLoader allColor={"text-primary"} mdSize="text-4xl" nmSize="text-2xl" fourth={true} />
            </div>}
          </div>
        </div>

        <div className="mt-2 md:mt-5 max-md:px-2 flex flex-col gap-2 md:gap-2.5 justify-center">
          <h1 className="dark:text-gray-200 md:text-xl font-medium line-clamp-2">{currentVideo?.snippet?.title}</h1>

          {/* Channel */}
          <Channel channelId={channelId} videoId={id}/>

          {/* Ai section */}
          <SummaryAndQA />

          {/* Comments */}
          <Comments id={id} />
        </div>
      </section>
      <section className='basis-full w-full md:basis-[37%] max-md:px-2 self-start'>
        <RelatedVideos categoryId={categoryId} setVideoLoader={setShowVideoLoader} />
      </section>
    </main>
  )
}

export default Watch;