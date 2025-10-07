const DotBounceLoader = () => {
    return <p className="flex gap-1.5 items-center -mb-1" >
        <span className='animate-dotBounce text-white text-2xl' style={{ animationDelay: "0s"}}>•</span>
        <span className='animate-dotBounce text-white text-2xl' style={{ animationDelay: "0.2s"}}>•</span>
        <span className='animate-dotBounce text-white text-2xl' style={{ animationDelay: "0.4s"}}>•</span>
      </p>

}

export default DotBounceLoader;