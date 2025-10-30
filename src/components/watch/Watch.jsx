import { useSearchParams } from "react-router-dom";
import { selectCurrentPlaying } from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";

import {
  useLazyGetCommentsQuery,
  useLazyGetChannelDetailsQuery,
} from "../../features/watch/watchApiSlice";

import { useLazyGetCategoryVideosQuery } from "../../features/home/homeApiSlice";
import { useEffect, useState } from "react";

const Watch = () => {
  const [ triggerComments ] = useLazyGetCommentsQuery();
  const [ triggerChannel ] = useLazyGetChannelDetailsQuery();
  const [ triggerCategory ] = useLazyGetCategoryVideosQuery();
  const currentVideo = useSelector(selectCurrentPlaying);

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const channelId = searchParam.get("channelid");
  const categoryId = searchParam.get("categoryid");

  const [ relatedVideos, setRelatedVideos ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ channel, setChannel ] = useState();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await Promise.all([ 
          triggerCategory({ id: categoryId }).unwrap(),
          triggerComments({ videoId: id }).unwrap(),
          triggerChannel({ channelId }).unwrap(),
        ])

        const [ relatedVideos, comments, channel ] = result;
        setChannel(channel);
        setComments(comments);
        setRelatedVideos(relatedVideos);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    }

    getData()
  }, [])

  console.log(currentVideo)

  return (
    <main className='pt-16 lg:pt-24 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between max-w-[1300px] mx-auto'>
      <section className='basis-full md:basis-[61%]'>
        <div className='w-full lg:rounded-2xl overflow-hidden md:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)]'>
          <iframe className='h-[14rem] md:h-[28rem] w-full rounded-md overflow-hidden aspect-video' src={`https://www.youtube.com/embed/${id}?si=miUcucQjdj2mjmo3`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>
      <section className='basis-full md:basis-[36%] max-md:px-2'>
        <p className="text-white">{currentVideo.snippet.title}.</p>
      </section>
    </main>
  )
}

export default Watch;