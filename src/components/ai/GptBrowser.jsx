import LogoAndMenu from "../layout/header/LogoAndMenu";
import { LoaderPinwheel, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsSmall } from "../../features/home/homeSlice";
import SmartSearch from "./SmartSearch";

const GptBrowser = () => {
    const isSmall = useSelector(selectIsSmall)

    return (
        <>
            <header className="absolute left-0 w-full h-30 lg:h-45">
                {/* Background shape */}
                <div
                    className="absolute inset-0 animate-slideDown bg-gradient-to-tr from-primary via-blue-500 to-green-400 pointer-events-none"
                    style={{
                        clipPath: "ellipse(71% 59% at 50% 40%)"
                    }}
                />

                {/* Actual interactive content */}
                <div className="relative z-50">
                    <div className="cursor-pointer self-start mt-2.5 md:mt-4 ml-2.5 md:ml-4">
                        <LogoAndMenu showMenu={false} />
                    </div>

                    <div className="flex gap-2 items-center justify-self-center text-white text-2xl lg:text-4xl font-bold tracking-wide mt-4 lg:mt-12">
                        <Sparkles
                            size={isSmall ? 20 : 30}
                            strokeWidth={1.5}
                            className="text-primary"
                        />
                        <span className="select-none">Promptly</span>
                        <Sparkles
                            size={isSmall ? 20 : 30}
                            strokeWidth={1.5}
                            className="text-primary"
                        />
                    </div>
                </div>
            </header>
            <main className={"animate-smoothShow pt-38 lg:pt-54 flex flex-col justify-center gap-8"}>
                <SmartSearch />
                {/* <section className="content border-red-400 border-2 md:pl-28 p-3"></section> */}
            </main>
        </>
    )
}

export default GptBrowser;