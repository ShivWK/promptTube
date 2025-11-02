import { useLocation } from "react-router-dom"
import SubFooter from "./SubFooter"

const Footer = () => {
  const pathName = useLocation().pathname;

  if (pathName === "/" || pathName === "/account") {
    return (
      <footer className="relative  left-0 bottom-0 w-full mt-1 z-20">
        <div className='absolute top-0 left-0 w-full h-52 lg:h-72 bg-gradient-to-tr from-primary via-blue-500 to-green-400 p-6 flex flex-col items-center -z-100' style={{
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