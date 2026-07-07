import { useEffect, useRef } from "react";

export const useIntersectionObserver = ({
    onIntersect,
    enabled = true,
    threshold = 0.1,
    root = null,
    rootMargin = "0px"
}) => {
    const targetRef = useRef();

    useEffect(() => {
        if (!enabled || !targetRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect(entry)
            }
        }, {
            root,
            rootMargin,
            threshold
        })

        observer.observe(targetRef.current);

        return () => observer.disconnect;
    }, [onIntersect, enabled, threshold, root, rootMargin])

    return targetRef;
}

export default useIntersectionObserver;