const VideoCardShimmer = () => {
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-shimmerBorder dark:bg-gray-900">
            <div className="w-full aspect-video animate-shimmer-bg"></div>

            <div className="flex flex-col gap-2 p-3">
                <div className="h-5 w-[95%] rounded animate-shimmer-bg"></div>

                <div className="h-4 w-[75%] rounded animate-shimmer-bg"></div>

                <div className="h-4 w-[55%] rounded animate-shimmer-bg"></div>
            </div>
        </div>
    );
};

export default VideoCardShimmer;