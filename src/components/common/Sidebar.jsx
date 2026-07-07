import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, setSidebar, setSearchLoading, selectIsSmall } from "../../features/home/homeSlice";
import { setSearchResult } from "../../features/home/homeSlice";
import { FIRST, GENERAL_SUB_CATEGORY, YOUR } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useLazyGetSearchVideosQuery } from "../../features/home/homeApiSlice";
import { selectLoggedInStatus } from "../../features/auth/authSlice";

const Sidebar = () => {
    const [trigger, { isLoading }] = useLazyGetSearchVideosQuery();
    const { slideOpenSidebar } = useSelector(selectSidebar);
    const isLoggedIn = useSelector(selectLoggedInStatus);
    const isSmall = useSelector(selectIsSmall);

    const pathname = useLocation().pathname;
    const navigate = useNavigate();
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

    const optionClickHandler = (url) => {
        if ((pathname === "/" && url !== "/") || (pathname === "/account" && url !== "/account")) {
            navigate(`${url}`)
        }

        dispatch(setSidebar({
            mode: "slide",
            value: false
        }))
    }

    const searchClickHandler = async (text) => {
        if (isLoading) return;
        // console.log("Clicked search")

        dispatch(setSearchLoading(true));
        divClickHandler();

        if (pathname !== "/pc_search" && pathname !== "/search") {
            if (isSmall) {
                navigate("/search");
            } else {
                navigate("/pc_search");
            }
        }

        try {
            const data = await trigger({ searchedTerm: text }).unwrap();
            dispatch(setSearchResult(data.items));
        } catch (err) {
            console.log("Failed to search", err)
        } finally {
            dispatch(setSearchLoading(false))
        }
    }

    const categoryClickHandler = (obj) => {
        // console.log("Clicked")

        const text = obj.searchTerms.join(" ");
        searchClickHandler(text);
    }

    return (
        <div onClick={divClickHandler} className="fixed top-0 left-0 h-full w-full bg-black/60 flex items-center justify-center z-60">
            <aside onClick={(e) => e.stopPropagation()} onAnimationEnd={animationENdHandler} className={`absolute left-0 h-full overflow-y-auto p-3 pr-5 flex flex-col gap-3 items-center bg-gray-800 pretty-scrollbar ${slideOpenSidebar ? "animate-slideShow" : "animate-slideHide"}`}>
                <button onClick={divClickHandler} className="self-start mt-2.5">
                    <X className="size-7.5 dark:text-white mr-auto rounded-full hover:bg-white/30 transition-all duration-100 ease-linear cursor-pointer" />
                </button>

                <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                    {
                        FIRST.map((obj, index) => {
                            if (!isLoggedIn) {
                                if (obj.name === "Subscription") return null;
                            }
                            return (
                                <button
                                    key={index}
                                    onClick={() => optionClickHandler(obj.url)}
                                    className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full"
                                >
                                    <obj.Icon />
                                    <span className="">{obj.name}</span>
                                </button>
                            )
                        })
                    }
                </div>

                {isLoggedIn && (
                    <div className="border-b-[1px] border-gray-400 pb-2 w-full">
                        {
                            YOUR.map((obj, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => optionClickHandler(obj.url)}
                                        className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full"
                                    >
                                        <obj.Icon />
                                        <span className="">{obj.name}</span>
                                    </button>
                                )
                            })
                        }
                    </div>
                )}

                <div className="pb-2 w-full">
                    {
                        GENERAL_SUB_CATEGORY.map((obj, index) => {
                            return <button
                                key={index}
                                onClick={() => categoryClickHandler(obj)}
                                className="flex items-center gap-3 lg:gap-4 dark:text-gray-100 cursor-pointer hover:bg-white/20 active:bg-white/20 rounded-xl p-2 pr-4 w-full"
                            >
                                <obj.Icon />
                                <span className="">{obj.name}</span>
                            </button>
                        })
                    }
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;