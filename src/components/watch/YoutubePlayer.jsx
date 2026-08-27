import { useEffect, useRef, useState } from "react";

const YouTubePlayer = ({ videoId, onLoad }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const previousVideoIdRef = useRef(null);
    const [apiReady, setApiReady] = useState(false);

    useEffect(() => {
        if (window.YT?.Player) {
            setApiReady(true);
            return;
        }

        const existingScript = document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]'
        );

        if (existingScript) {
            window.onYouTubeIframeAPIReady = () => {
                setApiReady(true);
            };

            return;
        }

        window.onYouTubeIframeAPIReady = () => {
            setApiReady(true);
        };

        const script = document.createElement("script");

        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            window.onYouTubeIframeAPIReady = null;
        };
    }, []);

    useEffect(() => {
        if (!apiReady || !containerRef.current || !videoId) {
            return;
        }

        if (playerRef.current) {
            return;
        }

        playerRef.current = new window.YT.Player(containerRef.current, {
            videoId,
            width: "100%",
            height: "100%",

            playerVars: {
                playsinline: 1,
                origin: window.location.origin,
            },

            events: {
                onReady: () => {
                    onLoad?.();
                },
            },
        });

        previousVideoIdRef.current = videoId;

        return () => {
            playerRef.current?.destroy();
            playerRef.current = null;
        };
    }, [apiReady, onLoad, videoId]);

    useEffect(() => {
        if (
            !playerRef.current ||
            !videoId ||
            previousVideoIdRef.current === videoId
        ) {
            return;
        }

        playerRef.current.loadVideoById(videoId);

        previousVideoIdRef.current = videoId;
    }, [videoId]);

    return (
        <div
            ref={containerRef}
            className="h-full w-full"
        />
    );
};

export default YouTubePlayer;