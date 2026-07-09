const VideoCardShimmer = () => {
    return (
        <div
            className="
                basis-full
                sm:basis-[48%]
                md:basis-[30%]
                lg:basis-[31%]
                xl:basis-[32%]
                self-start
                overflow-hidden
                rounded-2xl
                border
                border-shimmerBorder
                dark:bg-gray-900
                flex
                flex-col
            "
        >
            <div className="aspect-video w-full animate-shimmer-bg" />

            <div className="flex w-full flex-col gap-2 p-2">
                <div className="h-5 w-full rounded animate-shimmer-bg" />

                <div className="h-4 w-3/4 rounded animate-shimmer-bg" />

                <div className="h-4 w-1/2 rounded animate-shimmer-bg" />
            </div>
        </div>
    );
};

export default VideoCardShimmer;