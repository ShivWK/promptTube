const AccountShimmer = () => {
    return (
        <div className="mt-2 flex items-center gap-2 md:gap-3 p-2 w-full border border-shimmerBorder rounded-xl">
            <div className="rounded-full h-8 w-9 md:h-11 md:w-11 self-start animate-shimmer-bg" />

            <div className="flex flex-col gap-2 w-full basis-[60%]">
                <div className="w-[95%] h-3 rounded animate-shimmer-bg"></div>
                <div className="w-[55%] h-2 rounded animate-shimmer-bg"></div>
            </div>
        </div>
    )
}

export default AccountShimmer