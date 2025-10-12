import { useSearchParams } from "react-router-dom";
import { useLazyGetRelatedVideosQuery, useLazyGetCommentsQuery } from "../../features/home/homeApiSlice";
import { useEffect, useState } from "react";

const Watch = () => {
  const [triggerVideos, { isLoading: videosLoading }] = useLazyGetRelatedVideosQuery();
  const [triggerComments, { isLoading: commentsLoading }] = useLazyGetCommentsQuery();
  // const [ relatedVideoLoading, setRelatedVideoLoading ] = useState(true);
  // const [ commentsLoading, setCommentsLoading ] = useState(true);

  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);

  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await triggerVideos({ videoId: id }).unwrap();
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

    getData()
  }, [])

  return (
    <main className='pt-16 lg:pt-24 flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between max-w-[1300px] mx-auto'>
      <section className='basis-full md:basis-[61%]'>
        <div className='w-full lg:rounded-2xl overflow-hidden md:shadow-[0_0_15px_1px_rgba(255,255,255,0.4)]'>
          <iframe className='h-[14rem] md:h-[28rem] w-full rounded-md overflow-hidden aspect-video' src={`https://www.youtube.com/embed/${id}?si=miUcucQjdj2mjmo3`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullscreen></iframe>
        </div>
      </section>
      <section className='basis-full md:basis-[36%] max-md:px-2'>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, provident.</p>
      </section>
    </main>
  )
}

export default Watch;

// 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY]'