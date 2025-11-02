const VideoCardShimmer = () => {
  return (
    <div className="basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] rounded-2xl overflow-hidden flex flex-col items-center self-start border border-shimmerBorder h-[17rem] md:h-[19rem]">
            <div className="basis-[80%] animate-shimmer-bg w-full h-full"></div>
            <div className="p-2 w-full flex flex-col gap-2 basis-[20%]">
                <div className="w-[95%] h-5 rounded animate-shimmer-bg"></div>
                <div className="w-[75%] h-4 rounded animate-shimmer-bg"></div>
                <div className="w-[55%] h-4 rounded animate-shimmer-bg"></div>               
            </div>
        </div>
  )
}

export default VideoCardShimmer;