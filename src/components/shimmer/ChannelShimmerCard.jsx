const ChannelShimmerCard = () => {
    return (
        <div className="flex shrink-0 items-center gap-2 md:gap-3 p-2 rounded-lg border border-shimmerBorder min-w-52">
            <div className="rounded-full h-11 md:h-13 w-11 md:w-13 animate-shimmer-bg basis-[32%]" />
            <div className="h-fit flex flex-col gap-2 w-full">
                <div className="w-[95%] h-4 rounded animate-shimmer-bg"></div>
                <div className="w-[55%] h-3 rounded animate-shimmer-bg"></div>
            </div>
        </div>
    )
}

export default ChannelShimmerCard;