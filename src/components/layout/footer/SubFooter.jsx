import LogoAndMenu from "../header/LogoAndMenu"
import Attribution from "./Attribution"

const SubFooter = () => {
    return (
        <div className="flex flex-col gap-3 max-w-[1210px] justify-between text-white font-bold p-2 w-full mt-1.5 md:mt-3 mx-auto">
            <LogoAndMenu showMenu={false} showName={true} />

            <p className="text-gray-800 dark:text-gray-200">
                <span className="whitespace-normal tracking-wide">© 2025 PromptTube. All rights reserved.</span>
            </p>

            <Attribution />

            <div className="mt-2 font-normal ">
                <p className="hidden md:block">
                    <strong>PromptTube</strong> is a personal project built to explore the YouTube Data API, AI video summarization, smart Q&A, and intelligent search powered by modern frontend technologies like React, Redux, and Tailwind CSS.
                    It is created for educational and portfolio purposes only and is not affiliated with YouTube or Google.
                </p>

                <p className="md:hidden">
                    An AI-powered YouTube clone featuring video summaries, smart Q&A, and intelligent search.
                    Built with React, Redux & Tailwind CSS.
                </p>
            </div>
        </div>
    )
}

export default SubFooter