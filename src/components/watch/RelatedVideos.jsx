import { useEffect, useState } from "react";
import { useLazyGetCategoryVideosQuery } from "../../features/home/homeApiSlice";
import VideoCard from "../home/VideoCard";
import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideos = ({ categoryId }) => {
  const [trigger, { isLoading }] = useLazyGetCategoryVideosQuery();
  const [relatedVideos, setRelatedVideos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trigger({ id: categoryId }).unwrap();
        setRelatedVideos(response.items)
      } catch (err) {
        console.log("Err", err);
      }
    }

    fetchData()
  }, [])

  return (
    <section className='basis-full md:basis-[36%] max-md:px-2'>
      <h2>Related Videos</h2>

      <div className="w-full">
        {isLoading ? <p className="text-white">Loading...</p>
          : <div className="flex-col gap-4 w-full">
            {relatedVideos.map((video) => <RelatedVideoCard object={video} mode="related" flexMode="flex-col md:flex-row" />)}
          </div>}
      </div>
    </section>
  )
}

export default RelatedVideos