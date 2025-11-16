const CommentShimmer = () => {
    return (
        <div className="mt-2 flex items-center gap-2 md:gap-3 p-2 my-2.5 w-full border border-shimmerBorder rounded-lg">
            <div className="rounded-full h-9 w-10 md:h-11 md:w-12 self-start animate-shimmer-bg" />

            <div className="flex flex-col gap-2 w-full">
                <div className="w-[55%] h-2 md:h-3 rounded animate-shimmer-bg"></div>
                <div className="w-[95%] h-3 md:h-4 rounded animate-shimmer-bg"></div>
            </div>
        </div>
    )
}

export default CommentShimmer