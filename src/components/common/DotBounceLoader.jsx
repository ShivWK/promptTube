const DotBounceLoader = ({ color1="text-white", color2="text-white", color3="text-white", color4="text-white" , fourth=false, mdSize="text-2xl", nmSize="md:text-xl" }) => {
    return <p className="flex gap-1.5 items-center -mb-1" >
        <span className={`animate-dotBounce ${color1} ${nmSize} ${mdSize}`} style={{ animationDelay: "0s"}}>•</span>
        <span className={`animate-dotBounce ${color2} ${nmSize} ${mdSize}`} style={{ animationDelay: "0.2s"}}>•</span>
        <span className={`animate-dotBounce ${color3} ${nmSize} ${mdSize}`} style={{ animationDelay: "0.4s"}}>•</span>
        {
          fourth && <span className={`animate-dotBounce ${color4} ${nmSize} ${mdSize}`} style={{ animationDelay: "0.8s"}}>•</span>
        }
      </p>

}

export default DotBounceLoader;