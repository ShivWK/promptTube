import { useState } from "react";
import { useLazyGetCategoryVideosQuery } from "../../features/home/homeApiSlice";
import RelatedVideoCard from "./RelatedVideoCard";
import {selectCurrentPlaying} from "../../features/watch/watchSlice";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";

const RelatedVideos = ({ categoryId: id, setVideoLoader }) => {
  const [trigger, { isLoading }] = useLazyGetCategoryVideosQuery();
  const [relatedVideos, setRelatedVideos] = useState([])
  const currentVideo = useSelector(selectCurrentPlaying);

  useFetch({ trigger, id, setState: setRelatedVideos, fetchWhat: "related videos" })

  return (
    <>
      <h2 className="dark:text-gray-200 text-xl font-medium mt-3 mb-4">Related Videos</h2>
      <div className="w-full">
        {isLoading ? <p className="text-white">Loading...</p>
          : <div className="flex flex-col gap-5 md:gap-4 w-full">
            {relatedVideos.map((video) => {
              if (video.id !== currentVideo.id) {
                return <RelatedVideoCard key={video.id} setVideoLoader={setVideoLoader} object={video} mode="related" flexMode="flex-col md:flex-row" />
              }
            } )}
          </div>}
      </div>
    </>
  )
}

export default RelatedVideos