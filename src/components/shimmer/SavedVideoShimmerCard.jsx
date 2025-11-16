const SavedVideoShimmerCard = () => {
    return (
        <div className="flex shrink-0 h-60 w-72 flex-col gap-1 rounded-xl overflow-hidden border border-shimmerBorder">
            <div className="w-full animate-shimmer-bg h-full"></div>
            <div className="py-2 px-2 w-full flex flex-col gap-2">
                <div className="w-[95%] h-5 rounded animate-shimmer-bg"></div>
                <div className="w-[75%] h-4 rounded animate-shimmer-bg"></div>
            </div>
        </div>
    )
}

export default SavedVideoShimmerCard;