import { selectEmailVerification, setEmailVerification, selectUserDetails, setToast } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircleX } from "lucide-react";
import { useState } from "react";
import DotBounceLoader from "./DotBounceLoader";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

const EmailVerification = ({ isSmall }) => {
    const { showEmailVerification } = useSelector(selectEmailVerification);
    const { email } = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [ emailSend, setEmailSend ] = useState(false);

    const closeModel = () => {
        dispatch(setEmailVerification({
            mode: "slide",
            value: false,
        }))
    }

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideAuthModal")) {
            dispatch(setEmailVerification({
                mode: "open",
                value: false,
            }))
        }
    }

    const sendLinkHandler = async (e) => {
        e.stopPropagation();
        if (isLoading || emailSend) return;
        setLoading(true)

        try {
            await sendEmailVerification(auth.currentUser);
            setEmailSend(true);
            setLoading(false);
        } catch (err) {
            dispatch(setToast({
                message: "Unable to send email. Please try again.",
                show: true,
                error: true,
            }))

            setLoading(false);
            console.log(err)
        }
    }

    return (
        <div onClick={closeModel} className="absolute top-0 left-0 h-full w-full bg-black/60 flex items-center justify-center z-80">
            <div onAnimationEnd={animationEndHandler} className={`${showEmailVerification ? "animate-showAuthModal" : "animate-hideAuthModal"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-md bg-gray-700 w-[80%] lg:w-[25%] flex flex-col gap-3`}>
                <div className="flex justify-between items-center">
                    <p className="dark:text-white text-xl font-medium">Email Verification</p>
                    <CircleX onClick={closeModel} size={isSmall ? 20 : 25} strokeWidth={1.5} className="dark:text-white cursor-pointer" />
                </div>

                <p className="text-center dark:text-white leading-5 tracking-wide">
                    {`Your email ${email} isn’t verified yet. Please verify it.`}
                </p>

                { emailSend && <p className="text-center dark:text-green-400 leading-5 tracking-wide font-medium">Email send successfully</p>  }

                <button onClick={sendLinkHandler} className={`${ emailSend ? "bg-gray-500" : "bg-primary" } text-white rounded-md w-full mt-2 p-1 font-semibold cursor-pointer flex items-center justify-center lg:text-lg transform transition-all duration-150 ease-linear ${(!isLoading && !emailSend) && "active:scale-95 hover:bg-[#c2072d]" }`}>
                    {
                        isLoading
                            ? <DotBounceLoader />
                            : <p>{
                                emailSend ? "Check your mail" : "Send Link"
                            }</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default EmailVerification