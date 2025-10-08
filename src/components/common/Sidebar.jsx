import {
    X,
    House,
    MailPlus,
    ThumbsUp,
    History,
    Clock,

    ShoppingBag,
    Music,
    Clapperboard,
    RadioTower,
    Gamepad2,
    Newspaper,
    Trophy,
    GraduationCap,
    Shirt,
    Podcast,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, setSidebar } from "../../features/home/homeSlice";

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
            <aside onClick={(e) => e.stopPropagation()} onAnimationEnd={animationENdHandler} className={`absolute left-0 top-0 h-full overflow-y-auto p-3 pr-5 flex flex-col gap-3 items-center bg-gray-800 ${slideOpenSidebar ? "animate-slideShow" : "animate-slideHide"}`}>
                <X onClick={divClickHandler} size={isSmall ? 30 : 30} className="dark:text-white mr-auto rounded-full hover:bg-white/30 transition-all duration-100 ease-linear cursor-pointer mb-4" />

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    <div className="flex items-center gap-2 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 w-full">
                        <House />
                        <span className="font-medium">Home</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <MailPlus />
                        <span className="font-medium">Subscriptions</span>
                    </div>
                </div>

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <History />
                        <span className="font-medium">History</span>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 w-full">
                        <ThumbsUp />
                        <span className="font-medium">Liked videos</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Clock />
                        <span className="font-medium">Watch Later</span>
                    </div>
                </div>

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <ShoppingBag />
                        <span className="font-medium">Shopping</span>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 w-full">
                        <Music />
                        <span className="font-medium">Music</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Clapperboard />
                        <span className="font-medium">Films</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <RadioTower />
                        <span className="font-medium">Live</span>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 w-full">
                        <Gamepad2 />
                        <span className="font-medium">Gaming</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Newspaper />
                        <span className="font-medium">News</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Trophy />
                        <span className="font-medium">Sports</span>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 w-full">
                        <GraduationCap />
                        <span className="font-medium">Courses</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Shirt />
                        <span className="font-medium">Fashion & Beauty</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-100 cursor-pointer hover:bg-white/20 rounded-xl p-2 pr-4 w-full">
                        <Podcast />
                        <span className="font-medium">Podcasts</span>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;

{/* 
    <House />
    subscription <MailPlus />

    <ThumbsUp /> 
    <History />
    <Clock />

    <ShoppingBag />
    <Music />
    <Clapperboard /> Films
    <RadioTower /> live
    <Gamepad2 />
    <Newspaper />
    <Trophy />
    <GraduationCap />
    <Shirt />
    <Podcast />

    */}