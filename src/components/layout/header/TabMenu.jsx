import { useEffect, useRef, useState } from "react";
import { TABS } from "../../../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TabMenu = () => {
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true)
  const isSmall = window.innerWidth <= 768;

  useEffect(() => {
    if (!containerRef?.current) return;

    const handleScroll = () => {
      const ele = containerRef.current;

      const scrollW = ele.scrollWidth;
      const clientW = ele.clientWidth;
      const scrollL = ele.scrollLeft;

      if (scrollL !== 0) setShowLeft(true);
      else setShowLeft(false);

      if (scrollL + clientW + 10 >= scrollW) {
        setShowRight(false);
      } else {
        setShowRight(true);
      }
    }
    handleScroll();

    containerRef.current.addEventListener("scroll", handleScroll);
    return () => containerRef.current.addEventListener("scroll", handleScroll)
  }, [])

  const arrowClickHandler = (dir) => {
    if (!containerRef.current) return;
    const scrollAmount = 150;

    containerRef.current.scrollBy({
      left: dir * scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative w-full flex items-center justify-between">
      {showLeft && <button onClick={() => arrowClickHandler(-1)} className="absolute -left-0.5 top-1/2 -translate-y-1/2 bg-gray-800 rounded-e-full p-1.5 lg:p-2 cursor-pointer transform active:scale-95 transition-all duration-75 ease-linear max-md:hidden z-20">
        <ChevronLeft size={isSmall ? 30 : 40} className="dark:text-gray-200" />
      </button>}

      <div ref={containerRef} className="flex items-center gap-4 backdrop-blur-md pt-3 lg:py-4 overflow-auto px-1 scrollbar-hide">
        {
          TABS.map((item, index) => {
            return <button className="rounded-md lg:rounded-xl py-1 lg:py-2 px-3 lg:px-4 dark:bg-gray-400/30 dark:text-white lg:text-xl font-semibold cursor-pointer whitespace-nowrap select-none" key={index}>
              {item}
            </button>
          })
        }
      </div>

      {showRight && <button onClick={() => arrowClickHandler(1)} className="absolute -right-0.5 top-1/2 -translate-y-1/2 bg-gray-900 rounded-s-full p-1.5 lg:p-2 cursor-pointer transform active:scale-95 transition-all duration-75 ease-linear max-md:hidden z-20">
        <ChevronRight size={isSmall ? 30 : 40} className="dark:text-gray-200" />
      </button>}
    </div>
  )
}

export default TabMenu