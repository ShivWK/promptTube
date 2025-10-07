import { useState, useRef, useEffect } from "react";
import { CircleX } from "lucide-react";
import { dataValidator } from "../../utils/dataValidation";

const EntryDiv = ({
    formData,
    inputChangeHandler,
    placeholder,
    name,
    isSmall,
    type,
    errorMsg,
    isError,
    isSignUp,
    setFormError
}) => {
    const [move, setMove] = useState(false);
    const [error, setError] = useState("");
    const InputRef = useRef(null);

    useEffect(() => {
        if (!isError) return;
        setError(errorMsg)
    }, [isError, errorMsg])

    useEffect(() => {
        if (!move && formData?.[name].length !== 0) setMove(true)
    }, [formData?.[name]])

    useEffect(() => {
        setError("");
        setMove(false);
    }, [isSignUp])

    const divClickHandler = (e) => {
        e.stopPropagation();

        if (move) return;
        InputRef.current.focus();
    }

    const focusHandler = () => {
        setError("");
        setMove(true);
    }

    const blurHandler = (e) => {
        if (formData[name].length === 0) {
            setMove(false);
            setError(errorMsg);
        } else {
            dataValidator({ formData, whichOne: e.target.name.toUpperCase(), setFormError, isSignUp })
        }
    }

    return (
        <div>
            <div onClick={divClickHandler} className={`Relative h-14 lg:h-16 rounded border ${error && "border-red-500"} ${ move ? "border-blue-400" : "border-gray-500" } w-full p-2 cursor-text`}>
                <input
                    ref={InputRef}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    type={type}
                    value={formData[name]}
                    name={name}
                    onChange={inputChangeHandler}
                    className="relative -bottom-4.5 lg:-bottom-5 w-full border-none outline-none text-white font-semibold lg:text-lg"
                ></input>
                <p className={`relative text-gray-400 font-medium tracking-wide ${move ? "bottom-7 lg:bottom-8" : "text-xl lg:bottom-5 bottom-5"} transition-all duration-150 ease-linear select-none`}>{placeholder}</p>
            </div>
            {
                error && (
                    <p className="text-red-500 text-xs lg:text-sm font-medium tracking-wide mt-2 flex items-center gap-1">
                        <CircleX size={isSmall ? 18 : 20} className="shrink-0" />
                        <span>{error}</span>
                    </p>
                )
            }
        </div>
    )
}

export default EntryDiv