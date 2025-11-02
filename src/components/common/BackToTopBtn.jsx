import { useEffect, useState } from "react";
import { selectMobileMenu } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";

const BackToTopButton = ({}) => {
    const [showBtn, setShowBtn] = useState(false);
    const mobileMenu = useSelector(selectMobileMenu);

    console.log(mobileMenu);

    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const scrollHandler = () => {
            const HTML = document.documentElement;
            const windowScrollTop = HTML.scrollTop;

            const hasScrolledALot = windowScrollTop >= Math.max(HTML.clientHeight * 2.2, 500);

            if (hasScrolledALot) setShowBtn(true);
            else setShowBtn(false)
        }

        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

    return <button onClick={clickHandler} className={`fixed flex w-fit items-center justify-center gap-1 right-6 ${mobileMenu ? "bottom-16" : "bottom-5"} md:bottom-6 bg-[#ff004477] border-2 border-primary text-white font-heading py-1 lg:py-1.5 px-2 rounded-md lg:text-sm cursor-pointer transform transition-all duration-200 ease-linear font-semibold tracking-wide ${showBtn ? "translate-y-o" : "translate-y-[400%]"} z-10`}>
        <i className="ri-arrow-up-circle-line font-extralight text-xl animate-pulse"></i>
        <p className="hidden lg:block">Back to top</p>
        <p className="lg:hidden">Top</p>
    </button>
}

export default BackToTopButton;