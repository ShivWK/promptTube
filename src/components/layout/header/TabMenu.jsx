import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { selectIsSmall } from "../../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyGetVideoCategoriesQuery } from "../../../features/home/homeApiSlice";
import useFetch from "../../../hooks/useFetch";

const TabMenu = () => {
  const [triggerCategories, { isLoading }] = useLazyGetVideoCategoriesQuery();

  const containerRef = useRef(null);

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [tags, setTags] = useState([]);

  const isSmall = useSelector(selectIsSmall);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId");

  const tabsShimmer = Array.from({ length: 20 });

  useFetch({
    trigger: triggerCategories,
    setState: setTags,
    fetchWhat: "categories",
    argument: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const ele = containerRef.current;

      const scrollW = ele.scrollWidth;
      const clientW = ele.clientWidth;
      const scrollL = ele.scrollLeft;

      setShowLeft(scrollL > 0);
      setShowRight(scrollL + clientW + 10 < scrollW);
    };

    handleScroll();

    const ele = containerRef.current;
    ele.addEventListener("scroll", handleScroll);

    return () => {
      ele.removeEventListener("scroll", handleScroll);
    };
  }, [tags]);

  const arrowClickHandler = (dir) => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: dir * 150,
      behavior: "smooth",
    });
  };

  const categoryClickHandler = (id) => {
    navigate(`/category_videos?categoryId=${id}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex w-full items-center justify-between">
      {showLeft && (
        <button
          onClick={() => arrowClickHandler(-1)}
          className="absolute -left-0.5 top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-e-full bg-gray-800 p-1.5 transition-all duration-75 ease-linear active:scale-95 md:block"
        >
          <ChevronLeft
            size={isSmall ? 30 : 40}
            className="text-gray-200"
          />
        </button>
      )}

      <div
        ref={containerRef}
        className="scrollbar-hide flex items-center gap-3 overflow-auto px-1 py-1 pb-2 backdrop-blur-md md:gap-4 lg:py-2"
      >
        {isLoading
          ? tabsShimmer.map((_, index) => (
              <span
                key={index}
                className="h-8 w-36 shrink-0 animate-shimmer-bg rounded-lg py-1 px-3 md:h-10 md:rounded-xl"
              />
            ))
          : tags
              .slice(0, 17)
              .map((item) => {
                if (
                  item.snippet.title === "Short Movies" ||
                  item.snippet.title === "Travel & Events" ||
                  item.snippet.title === "Videoblogging" ||
                  item.snippet.title === "Education"
                ) {
                  return null;
                }

                const isActive =
                  selectedCategoryId === String(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => categoryClickHandler(item.id)}
                    className={`rounded-md px-3 py-1 font-medium whitespace-nowrap tracking-wide transition-all duration-150 lg:rounded-xl lg:py-1.5 lg:text-lg ${
                      isActive
                        ? "bg-[#ff0044] text-white"
                        : "bg-gray-400/30 text-white hover:bg-gray-400/50"
                    }`}
                  >
                    {item.snippet.title}
                  </button>
                );
              })}
      </div>

      {showRight && (
        <button
          onClick={() => arrowClickHandler(1)}
          className="absolute -right-0.5 top-1/2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-s-full bg-gray-900 p-1.5 transition-all duration-75 ease-linear active:scale-95 md:block"
        >
          <ChevronRight
            size={isSmall ? 30 : 40}
            className="text-gray-200"
          />
        </button>
      )}
    </div>
  );
};

export default TabMenu;