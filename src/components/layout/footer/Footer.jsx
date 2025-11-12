import { useLocation } from "react-router-dom"
import SubFooter from "./SubFooter"
import { useRef } from "react";
import useIntersection from "../../../hooks/useIntersection";
import { useDispatch } from "react-redux";
import { setFooterVisibility } from "../../../features/home/homeSlice";

const Footer = () => {
  const pathName = useLocation().pathname;
  const footerRef = useRef(null);
  const dispatch = useDispatch();

  useIntersection({ ref: footerRef, setReady: (what) => dispatch(setFooterVisibility(what)) })

  if (pathName === "/" || pathName === "/account") {
    return (
      <footer ref={footerRef} className="relative left-0 bottom-0 w-full mt-4 md:mt-6 z-20">
        <div className='absolute top-0 left-0 w-full h-52 lg:h-72 bg-gradient-to-tr from-green-400 via-blue-500 to-primary p-6 flex flex-col items-center -z-100 max-md:pb-11' style={{
          clipPath: "ellipse(71% 59% at 50% 40%)"
        }}></div>

        <div className="w-full f-full py-1 px-2 md:py-4 backdrop-blur-2xl bg-black/40">
          <SubFooter />
        </div>
      </footer>
    )
  }
  return null;
}

export default Footer