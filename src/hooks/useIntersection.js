import { useEffect } from "react";

const useIntersection = ({ ref, setReady, threshold=0.3 }) => {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setReady(true)
                } else {
                    setReady(false)
                };
            })
        }, { threshold });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, setReady, threshold])
}

export default useIntersection;