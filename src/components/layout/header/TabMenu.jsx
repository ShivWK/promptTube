import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { selectIsSmall, setCategoryVideo } from "../../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useLazyGetVideoCategoriesQuery,
  useLazyGetCategoryVideosQuery
} from "../../../features/home/homeApiSlice";
import DotBounceLoader from "../../common/DotBounceLoader";

const TabMenu = () => {
  const [triggerCategories, { isLoading }] = useLazyGetVideoCategoriesQuery();
  const [triggerCategoryVideos] = useLazyGetCategoryVideosQuery();
  const containerRef = useRef(null);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true)
  const [tags, setTags] = useState([]);
  const isSmall = useSelector(selectIsSmall);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const tabsShimmer = Array.from({ length: 20 })

  useEffect(() => {
    const videoCategories = async () => {
      try {
        const { items } = await triggerCategories().unwrap();
        setTags(items)
      } catch (err) {
        console.log(err);
      }
    }

    videoCategories();
  }, [])

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

    const ele = containerRef.current;
    ele.addEventListener("scroll", handleScroll);

    return () => {
      if (ele) ele.removeEventListener("scroll", handleScroll);
    };
  }, [tags])

  const arrowClickHandler = (dir) => {
    if (!containerRef.current) return;
    const scrollAmount = 150;

    containerRef.current.scrollBy({
      left: dir * scrollAmount,
      behavior: "smooth"
    })
  }

  const categoryClickHandler = async (id) => {
    if (pathname !== "/category_videos") navigate("/category_videos")
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    let value = [];

    dispatch(setCategoryVideo({
      value,
      loading: true
    }))

    try {
      const response = await triggerCategoryVideos({ id }).unwrap();
      value = response.items;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setCategoryVideo({
        value,
        loading: false,
      }))
    }
  }

  return (
    <div className="relative w-full flex items-center justify-between">
      {showLeft && <button onClick={() => arrowClickHandler(-1)} className="absolute -left-0.5 top-1/2 -translate-y-1/2 bg-gray-800 rounded-e-full p-1.5 cursor-pointer transform active:scale-95 transition-all duration-75 ease-linear max-md:hidden z-20">
        <ChevronLeft size={isSmall ? 30 : 40} className="dark:text-gray-200" />
      </button>}

      <div ref={containerRef} className="flex items-center gap-4 backdrop-blur-md py-1 lg:py-2 px-1 overflow-auto scrollbar-hide">
        {isLoading
          ? tabsShimmer.map((_, index) => <span key={index} className="rounded-md lg:rounded-xl py-1 lg:py-1.5 px-3 dark:bg-gray-400/30 dark:text-white lg:text-lg font-medium cursor-pointer whitespace-nowrap select-none tracking-wide">
            <DotBounceLoader color1="text-primary" color3="text-primary" nmSize="text-lg" mdSize="text-xl" />
          </span>)
          : tags.map((item) => {
            return <button onClick={() => categoryClickHandler(item.id)} className="rounded-md lg:rounded-xl py-1 lg:py-1.5 px-3 dark:bg-gray-400/30 dark:text-white lg:text-lg font-medium cursor-pointer whitespace-nowrap select-none tracking-wide" key={item.id}>
              {item.snippet.title}
            </button>
          })
        }
      </div>

      {showRight && <button onClick={() => arrowClickHandler(1)} className="absolute -right-0.5 top-1/2 -translate-y-1/2 bg-gray-900 rounded-s-full p-1.5 cursor-pointer transform active:scale-95 transition-all duration-75 ease-linear max-md:hidden z-20">
        <ChevronRight size={isSmall ? 30 : 40} className="dark:text-gray-200" />
      </button>}
    </div>
  )
}

export default TabMenu