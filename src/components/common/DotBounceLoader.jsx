const DotBounceLoader = ({ color1="text-white", color2="text-white", color3="text-white", color4="text-white" , fourth=false }) => {
    return <p className="flex gap-1.5 items-center -mb-1" >
        <span className={`animate-dotBounce ${color1} text-xl md:text-2xl`} style={{ animationDelay: "0s"}}>•</span>
        <span className={`animate-dotBounce ${color2} text-xl md:text-2xl`} style={{ animationDelay: "0.2s"}}>•</span>
        <span className={`animate-dotBounce ${color3} text-xl md:text-2xl`} style={{ animationDelay: "0.4s"}}>•</span>
        {
          fourth && <span className={`animate-dotBounce ${color4} text-xl md:text-2xl`} style={{ animationDelay: "0.8s"}}>•</span>
        }
      </p>

}

export default DotBounceLoader;