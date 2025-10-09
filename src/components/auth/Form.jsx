import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSlideAuthForm, setOpenAuthForm } from "../../features/authSlice";
import EntryDiv from "./EntryDiv";
import { dataValidator } from "../../utils/dataValidation";
import signUpHandler from "../../utils/signUpHandler";
import signInHandler from "../../utils/signInHandler";
import DotBounceLoader from "../common/DotBounceLoader";
import { CircleX } from "lucide-react";

const Form = () => {
    const openSlideAuthForm = useSelector(selectSlideAuthForm);
    const dispatch = useDispatch();

    const [isSmall, setSmall] = useState(false);
    const [isSignUP, setSignUp] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [gAuthLoading, setGAuthLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState({
        name: {
            error: false,
            errorMsg: "Please enter a valid name."
        },

        email: {
            error: false,
            errorMsg: "Please enter a valid email."
        },

        password: {
            error: false,
            errorMsg: "Please enter a valid password."
        }
    });

    useEffect(() => {
        setFormError((pre => ({
            name: {
                error: false,
                errorMsg: pre.name.errorMsg,
            },

            email: {
                error: false,
                errorMsg: pre.email.errorMsg,
            },

            password: {
                error: false,
                errorMsg: pre.password.errorMsg,
            }
        })))

        setFormData({
            name: "",
            email: "",
            password: "",
        })
    }, [isSignUP]);

    useEffect(() => {
        const resizeHandler = () => {
            if (window.innerWidth <= 768) {
                setSmall(true);
            } else {
                setSmall(false);
            }
        }

        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    const inputChangeHandler = (e) => {
        setFormData((prv) => {
            return {
                ...prv,
                [e.target.name]: e.target.value,
            }
        })
    }

    const handleForgotPasswordClick = () => {
        setFormError((pre => ({
            ...pre,
            password: {
                error: true,
                errorMsg: "New error occurred"
            }
        })))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (authLoading) return;
        setAuthLoading(true);

        const result = dataValidator({ formData, isSignUp: isSignUP, setFormError, whichOne: "ALL" });

        if (!result) {
            setAuthLoading(false);
            return;
        };

        if (isSignUP) {
            signUpHandler({ email: formData.email, password: formData.password, name: formData.name, dispatch, setAuthLoading })
        } else {
            signInHandler({ email: formData.email, password: formData.password, dispatch, setAuthLoading })
        }
    }

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideAuthModal")) {
            dispatch(setOpenAuthForm({
                mode: "open",
                value: false,
            }))
        }
    }

    const closeClickHandler = () => {
        dispatch(setOpenAuthForm({
            mode: "slide",
            value: false
        }))
    }

    const divClickHandler = () => {
        dispatch(setOpenAuthForm({
            mode: "slide",
            value: false
        }))
    }

    return (
        <div onClick={divClickHandler} className="absolute top-0 left-0 h-full w-full bg-black/60 flex items-center justify-center z-30">
            <form onClick={(e) => e.stopPropagation()} onAnimationEnd={animationEndHandler} onSubmit={submitHandler} className={`absolute ${openSlideAuthForm ? "animate-showAuthModal" : "animate-hideAuthModal"} top-2/5 md:top-2/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 overflow-hidden w-[95%] lg:w-[35%] px-4 lg:px-8 py-6 transition-all duration-200 ease-linear mt-18 lg:mt-28 rounded-md z-40`}>

                <div className="flex justify-between items-center mb-3 lg:mb-5">
                    <h1 className="text-white font-bold text-xl lg:text-2xl">
                        {isSignUP ? "Sign Up" : "Sign In"}
                    </h1>

                    <CircleX onClick={closeClickHandler} size={isSmall ? 25 : 30} strokeWidth={1.5} className="dark:text-white cursor-pointer" />
                </div>

                <div className="flex flex-col gap-4.5">

                    {
                        isSignUP && <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="name" placeholder="Name" isSmall={isSmall} type="text" errorMsg={formError.name.errorMsg} isError={formError.name.error} isSignUp={isSignUP} setFormError={setFormError} />
                    }

                    <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="email" placeholder="Email" isSmall={isSmall} type="text" errorMsg={formError.email.errorMsg} isError={formError.email.error} isSignUp={isSignUP} setFormError={setFormError} />

                    <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="password" placeholder="Password" isSmall={isSmall} type="password" errorMsg={formError.password.errorMsg} isError={formError.password.error} isSignUp={isSignUP} setFormError={setFormError} />

                    <div className="flex gap-2 items-center">
                        <button type="button" className={`flex items-center justify-center gap-1 md:gap-2 text-gary-300 font-semibold text-white tracking-wide w-full bg-white/20 hover:bg-white/10 px-1 py-1.5 lg:py-2 rounded lg:text-xl ${!gAuthLoading && "active:scale-95"} transform transition-all duration-75 ease-linear cursor-pointer select-none`}>
                            <span>Continue with</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                                <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                        </button>

                        <button type="submit" className={`flex items-center justify-center w-full bg-primary text-white font-semibold tracking-wide py-1.5 lg:py-2 rounded lg:text-xl ${!authLoading && "active:scale-95"} transform transition-all duration-75 ease-linear cursor-pointer hover:bg-[#df0421]`}>
                            {authLoading ? <DotBounceLoader /> : isSignUP ? "Sign Up" : "Sign In"}
                        </button>
                    </div>

                    {
                        !isSignUP && <span onClick={handleForgotPasswordClick} className="text-white font-semibold text-center underline lg:text-lg cursor-pointer hover:text-gray-300 transition-all duration-100 ease-linear select-none">Forgot password?</span>
                    }

                    <p className="flex items-center gap-1 lg:text-lg">
                        <span className="text-gray-300 lg:font-medium">
                            {isSignUP ? "Already registered?" : "New to PromptTube?"}
                        </span>
                        <span onClick={() => setSignUp(!isSignUP)} className="text-white font-bold cursor-pointer underline">
                            {isSignUP ? "Sign in now" : "Sign up now"}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Form;