import LogoAndMenu from "../layout/header/LogoAndMenu";
import { LoaderPinwheel, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsSmall } from "../../features/home/homeSlice";
import SmartSearch from "./SmartSearch";

const GptBrowser = () => {
    const isSmall = useSelector(selectIsSmall)

    return (
        <>
            <header className='absolute animate-slideDown left-0 w-full h-30 lg:h-45 bg-gradient-to-tr from-primary via-blue-500 to-green-400 p-6 flex flex-col items-center' style={{
                clipPath: "ellipse(71% 59% at 50% 40%)"
            }}>
                <div className="self-start justify-self-start">
                    <LogoAndMenu showMenu={false} />
                </div>

                <div className="flex gap-2 items-center justify-self-center text-white text-2xl lg:text-4xl font-bold tracking-wide mt-1 lg:mt-10">
                    <Sparkles
                        size={isSmall ? 20 : 30} strokeWidth={1.5}
                        className="text-primary"
                    />
                    <span className="">Promptly</span>
                    <Sparkles
                        size={isSmall ? 20 : 30} strokeWidth={1.5}
                        className="text-primary"
                    />
                </div>
            </header>
            <main className={"pt-38 lg:pt-54 flex flex-col justify-center gap-8"}>
                <SmartSearch />
                {/* <section className="content border-red-400 border-2 md:pl-28 p-3"></section> */}
            </main>
        </>
    )
}

export default GptBrowser;