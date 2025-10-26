import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, setSidebar } from "../../features/home/homeSlice";
import { FIRST, GENERAL_SUB_CATEGORY, YOUR } from "../../utils/constants";

const Sidebar = ({ isSmall }) => {
    const { slideOpenSidebar } = useSelector(selectSidebar);
    const dispatch = useDispatch();

    const divClickHandler = () => {
        dispatch(setSidebar({
            mode: "slide",
            value: false
        }))
    }

    const animationENdHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-slideHide")) {
            dispatch(setSidebar({
                mode: "open",
                value: false,
            }))
        }
    }

    return (
        <div onClick={divClickHandler} className="absolute top-0 left-0 h-full w-full bg-black/60 flex items-center justify-center z-60">
            <aside onClick={(e) => e.stopPropagation()} onAnimationEnd={animationENdHandler} className={`absolute left-0 top-0 h-full overflow-y-auto p-3 pr-5 flex flex-col gap-3 items-center bg-gray-800 pretty-scrollbar ${slideOpenSidebar ? "animate-slideShow" : "animate-slideHide"}`}>

                <button onClick={divClickHandler} className="self-start mt-2.5">
                    <X size={isSmall ? 30 : 30} className="dark:text-white mr-auto rounded-full hover:bg-white/30 transition-all duration-100 ease-linear cursor-pointer" />
                </button>

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    {
                        FIRST.map((obj, index) => <button key={index} className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full">
                            <obj.Icon />
                            <span className="">{obj.name}</span>
                        </button>)
                    }
                </div>

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    {
                        YOUR.map((obj, index) => <button key={index} className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full">
                            <obj.Icon />
                            <span className="">{obj.name}</span>
                        </button>)
                    }
                </div>

                <div className="pb-2 w-full">
                    {
                        GENERAL_SUB_CATEGORY.map((obj, index) => <button key={index} className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full">
                            <obj.Icon />
                            <span className="">{obj.name}</span>
                        </button>)
                    }
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;

// https://suggestqueries-clients6.youtube.com/complete/search?ds=yt&hl=en-gb&gl=in&client=youtube&gs_ri=youtube&tok=SkNh2E49BDDZfZLBosN4gQ&h=180&w=320&ytvs=1&gs_id=1&q=j&cp=1