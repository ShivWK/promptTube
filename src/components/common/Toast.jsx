import { useEffect } from "react";
import { selectToast } from "../../features/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../../features/loginSlice";

const Toast = () => {
    const { show, message, error } = useSelector(selectToast);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setToast({
                message: "",
                error: false,
                show: false,
            }))
        }, 4000);

        return () => clearTimeout(timer);
    }, [show])

    return <div className={`fixed ${show ? "bottom-8 lg:bottom-10" : "-bottom-30"} left-1/2 -translate-x-1/2 lg:max-w-[30%] w-[80%] py-2 px-3 rounded-lg font-medium tracking-wide font-heading border-2 text-gray-100 text-center ${error ? "border-red-500 bg-red-500/60 shadow-[0_0_15px_2px_rgba(0,153,255,0.5)]" : "border-green-600 bg-green-500/60 shadow-[0_0_8px_4px_rgba(0,153,255,0.5)]"} transition-all duration-200 ease-in-out break-words whitespace-normal`}>
        {message}
    </div>
}

export default Toast;