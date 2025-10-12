import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSlideAuthForm, setOpenAuthForm } from "../../features/authSlice";
import EntryDiv from "./EntryDiv";
import { dataValidator } from "../../utils/dataValidation";
import signUpHandler from "../../utils/signUpHandler";
import signInHandler from "../../utils/signInHandler";
import DotBounceLoader from "../common/DotBounceLoader";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordReset from "./PasswordReset";
import resetPasswordHandler from "../../utils/resetPasswordHandler";
import SignInWithGoogle from "./SignInWithGoogle";

const Form = () => {
    const openSlideAuthForm = useSelector(selectSlideAuthForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [heading, setHeading] = useState("Sign In")
    const [isSmall, setSmall] = useState(false);
    const [isSignUP, setSignUp] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);

    const [resetPasswordMailSend, setResetPasswordMailSend] = useState(false);
    const [ resetPasswordLoading, setResetPasswordLoading ] = useState(false);

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
        setPasswordReset(true);
        setHeading("Password Reset");
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
            signUpHandler({ email: formData.email, password: formData.password, name: formData.name, dispatch, setAuthLoading, navigate })
        } else if (passwordReset) {
            resetPasswordHandler({ setResetPasswordLoading, setResetPasswordMailSend, email:formData.email, dispatch, resetPasswordMailSend })
        } else {
            signInHandler({ email: formData.email, password: formData.password, dispatch, setAuthLoading, navigate })
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

    const signUpClickHandler = () => {
        setSignUp(!isSignUP);
        setHeading((prv) => {
            if (prv === "Sign Up") {
                return "Sign In"
            } else {
                return "Sign Up"
            }
        })
    }

    return (
        <div onClick={divClickHandler} className="absolute top-0 left-0 h-full w-full bg-black/60 flex items-center justify-center z-30">
            <form onClick={(e) => e.stopPropagation()} onAnimationEnd={animationEndHandler} onSubmit={submitHandler} className={`absolute ${openSlideAuthForm ? "animate-showAuthModal" : "animate-hideAuthModal"} top-2/5 md:top-2/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 overflow-hidden w-[95%] lg:w-[35%] px-4 lg:px-8 py-6 transition-all duration-200 ease-linear mt-18 lg:mt-28 rounded-md z-40`}>

                <div className="flex justify-between items-center mb-3 lg:mb-5">
                    <h1 className="text-white font-semibold text-xl lg:text-2xl tracking-wide">
                        {heading}
                    </h1>

                    <CircleX onClick={closeClickHandler} size={isSmall ? 25 : 30} strokeWidth={1.5} className="dark:text-white cursor-pointer" />
                </div>

                <div className="flex flex-col gap-4.5">
                    {(!passwordReset && isSignUP) && <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="name" placeholder="Name" isSmall={isSmall} type="text" errorMsg={formError.name.errorMsg} isError={formError.name.error} isSignUp={isSignUP} setFormError={setFormError} />}

                    <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="email" placeholder="Email" isSmall={isSmall} type="text" errorMsg={formError.email.errorMsg} isError={formError.email.error} isSignUp={isSignUP} setFormError={setFormError} />

                    {!passwordReset && <EntryDiv inputChangeHandler={inputChangeHandler} formData={formData} name="password" placeholder="Password" isSmall={isSmall} type="password" errorMsg={formError.password.errorMsg} isError={formError.password.error} isSignUp={isSignUP} setFormError={setFormError} />}

                    {!passwordReset && <div className="flex gap-2 items-center mt-2">
                        <SignInWithGoogle />
                        <button type="submit" className={`flex items-center justify-center w-full bg-primary text-white font-semibold tracking-wide py-1.5 lg:py-2 rounded lg:text-xl ${!authLoading && "active:scale-95 hover:bg-[#df0421]"} transform transition-all duration-75 ease-linear cursor-pointer`}>
                            {authLoading ? <DotBounceLoader /> : isSignUP ? "Sign Up" : "Sign In"}
                        </button>
                    </div>}

                    {(!passwordReset && !isSignUP) && <span onClick={handleForgotPasswordClick} className="text-white font-semibold text-center underline lg:text-lg cursor-pointer hover:text-gray-300 transition-all duration-100 ease-linear select-none">Forgot password?</span>}

                    {!passwordReset && <p className="flex items-center gap-1 lg:text-lg">
                        <span className="text-gray-300 lg:font-medium">
                            {isSignUP ? "Already registered?" : "New to PromptTube?"}
                        </span>
                        <button type="button" onClick={signUpClickHandler} className="text-white font-bold cursor-pointer underline">
                            {isSignUP ? "Sign in now" : "Sign up now"}
                        </button>
                    </p>}

                    {passwordReset && <PasswordReset resetPasswordLoading={resetPasswordLoading} resetPasswordMailSend={resetPasswordMailSend} />}
                </div>
            </form>
        </div>
    )
}

export default Form;