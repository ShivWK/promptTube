const VideoCardShimmer = ({ smartSearch = false }) => {
    return (
        <div className=" basis-full sm:basis-[48%] md:basis-[30%] lg:basis-[31%] xl:basis-[32%] self-start overflow-hidden rounded-2xl border border-shimmerBorder dark:bg-gray-900 flex flex-col">
            {/* Thumbnail */}
            <div className="relative aspect-video w-full animate-shimmer-bg">
                {smartSearch && (
                    <>
                        {/* Rank */}
                        <div className="absolute top-3 left-3 h-7 w-14 rounded-full animate-shimmer-bg" />

                        {/* Score */}
                        <div className="absolute top-3 right-3 h-7 w-14 rounded-full animate-shimmer-bg" />
                    </>
                )}
            </div>

            {/* Content */}
            <div className="flex w-full flex-col gap-2 p-3">

                {/* Title */}
                <div className="h-5 w-full rounded animate-shimmer-bg" />

                {/* Channel */}
                <div className="h-4 w-3/4 rounded animate-shimmer-bg" />

                {/* Date / views */}
                <div className="h-4 w-1/2 rounded animate-shimmer-bg" />

                {smartSearch && (
                    <div className="mt-2 space-y-3 border-t border-gray-700 pt-3">

                        {/* Why recommended */}
                        <div className="space-y-2">
                            <div className="h-3 w-2/5 rounded animate-shimmer-bg" />
                            <div className="h-4 w-full rounded animate-shimmer-bg" />
                            <div className="h-4 w-5/6 rounded animate-shimmer-bg" />
                        </div>

                        {/* Strengths */}
                        <div className="space-y-2">
                            <div className="h-3 w-1/4 rounded animate-shimmer-bg" />

                            <div className="flex gap-2">
                                <div className="h-4 w-4 rounded-full animate-shimmer-bg" />
                                <div className="h-4 w-4/5 rounded animate-shimmer-bg" />
                            </div>

                            <div className="flex gap-2">
                                <div className="h-4 w-4 rounded-full animate-shimmer-bg" />
                                <div className="h-4 w-3/4 rounded animate-shimmer-bg" />
                            </div>

                            <div className="flex gap-2">
                                <div className="h-4 w-4 rounded-full animate-shimmer-bg" />
                                <div className="h-4 w-2/3 rounded animate-shimmer-bg" />
                            </div>
                        </div>

                        {/* Weaknesses */}
                        <div className="space-y-2">
                            <div className="h-3 w-2/5 rounded animate-shimmer-bg" />

                            <div className="flex gap-2">
                                <div className="h-4 w-4 rounded-full animate-shimmer-bg" />
                                <div className="h-4 w-4/5 rounded animate-shimmer-bg" />
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCardShimmer;