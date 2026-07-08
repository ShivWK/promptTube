import { useEffect, useState } from "react";

function useIsSmall() {
    const [isSmall, setIsSmall] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmall(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isSmall;
}

export default useIsSmall;