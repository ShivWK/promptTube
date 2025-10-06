import { Menu } from "lucide-react"

const LogoAndMenu = () => {
    const isSmall = window.innerWidth <= 798;

    return (
        <div className="flex gap-2 lg:gap-5 items-center">
            <Menu size={isSmall ? 30 : 40} className="dark:text-white cursor-pointer" />
            <div className="flex gap-3">
                <img src="/favicon/android-chrome-192x192.png" className="h-9 lg:h-12 w-10 lg:w-13"></img>
                <h1 className="text-[#ff0033] font-bold text-4xl max-md:hidden">
                    PromptTube
                </h1>
            </div>
        </div>
    )
}

export default LogoAndMenu