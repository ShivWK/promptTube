import DotBounceLoader from "../common/DotBounceLoader";

const PasswordReset = ({ resetPasswordLoading, resetPasswordMailSend }) => {
    return (
        <div className="flex flex-col gap-2">
            {resetPasswordMailSend && <p className="text-center text-green-400 leading-6 tracking-wide font-medium lg:text-lg">Email sent successfully! Check your inbox or spam folder if you don’t see it.</p>}

            <button type="submit" className={`flex items-center justify-center w-full ${resetPasswordMailSend ? "bg-gray-500" : "bg-primary"} text-white font-semibold tracking-wide py-1.5 lg:py-2 rounded lg:text-xl ${(!resetPasswordLoading && !resetPasswordMailSend) && "active:scale-95 hover:bg-[#df0421]"} transform transition-all duration-75 ease-linear cursor-pointer mt-2`}>
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