import DotBounceLoader from "../common/DotBounceLoader";

const PasswordReset = ({ resetPasswordLoading, resetPasswordMailSend }) => {
    return (
        <div className="flex flex-col gap-2">
            {resetPasswordMailSend && <p className="text-center text-green-400 leading-6 tracking-wide font-medium lg:text-lg">Email sent successfully! Check your inbox or spam folder if you don’t see it.</p>}

            <button
                type="submit"
                className={`flex items-center justify-center w-full text-white font-medium tracking-wide rounded lg:text-lg  
                ${resetPasswordLoading ? "py-2" : "py-1.5"}
                ${resetPasswordMailSend ? "bg-gray-500" : "bg-primary"} 
                ${(!resetPasswordLoading && !resetPasswordMailSend)
                    && "active:scale-95 hover:bg-[#df0421]"} transform transition-all duration-75 ease-linear cursor-pointer mt-2`
                }
            >
                {resetPasswordLoading
                    ? <DotBounceLoader />
                    : resetPasswordMailSend
                        ? "Check your mail"
                        : "Send Reset Link"
                }
            </button>
        </div>
    )
}

export default PasswordReset