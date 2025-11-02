import LogoAndMenu from "../header/LogoAndMenu"
import Attribution from "./Attribution"

const SubFooter = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 max-w-[1210px] justify-between text-white font-bold p-2 w-full my-1.5 md:my-3 mx-auto">
            <div className="md:basis-[40%] flex flex-col justify-center gap-2">
                <LogoAndMenu showMenu={false} showName={true} />

                <p className="text-white">
                    <span className="whitespace-normal tracking-wide font-medium">© 2025 PromptTube. All rights reserved.</span>
                </p>

                <Attribution />
            </div>

            <div className="mt-2 font-normal md:basis-[60%]">
                <p className="hidden md:block text-lg">
                    <strong>PromptTube</strong> is a personal project built to explore the YouTube Data API, AI video summarization, smart Q&A, and intelligent search powered by modern frontend technologies like React, Redux, and Tailwind CSS.
                    It is created for educational and portfolio purposes only and is not affiliated with YouTube or Google.
                </p>

                <p className="md:hidden">
                    It is an AI-powered YouTube clone featuring video summaries, smart Q&A, and intelligent search.
                    Built with React, Redux & Tailwind CSS.
                </p>
            </div>
        </div>
    )
}

export default SubFooter