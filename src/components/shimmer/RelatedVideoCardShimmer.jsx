const RelatedVideoCardShimmer = () => {
    return (
        <div className="rounded-2xl flex flex-col md:flex-row overflow-hidden self-start md:h-36 h-auto w-full border border-shimmerBorder">
            <div className="animate-shimmer-bg h-44 w-full md:h-full md:basis-[40%]"></div>
            <div className="p-2 dark:text-white w-full flex flex-col gap-2 md:gap-3 h-full md:basis-[60%] py-2 md:py-4">
                <div className="w-[95%] h-5 rounded animate-shimmer-bg"></div>
                <div className="w-[75%] h-4 rounded animate-shimmer-bg"></div>
                <div className="w-[55%] h-4 rounded animate-shimmer-bg"></div>
            </div>
        </div>
    )
}

export default RelatedVideoCardShimmer;