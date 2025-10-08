import LogoAndMenu from "../layout/header/LogoAndMenu";
import { LoaderPinwheel } from "lucide-react";
import { useState, useEffect } from "react";

const GptBrowser = () => {
    const [isSmall, setSmall] = useState(false);

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

    return (
        <>
            <header className='absolute animate-slideDown left-0 w-full h-32 lg:h-52 bg-gradient-to-tr from-primary via-blue-500 to-green-400 p-6 flex flex-col items-center' style={{
                clipPath: "ellipse(71% 59% at 50% 40%)"
            }}>
                <div className="self-start justify-self-start">
                    <LogoAndMenu showMenu={false} />
                </div>

                <div className="flex gap-2 items-center justify-self-center text-white text-2xl lg:text-4xl font-bold tracking-wide mt-1 lg:mt-10">
                    <span className="">Promptly</span>
                    <LoaderPinwheel size={isSmall ? 25 : 40} className="animate-spin" />
                </div>
            </header>
            <main></main>
        </>
    )
}

export default GptBrowser;