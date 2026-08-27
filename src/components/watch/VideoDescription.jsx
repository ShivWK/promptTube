import { useState } from "react";

const VideoDescription = ({ videoDetails }) => {
    const [expanded, setExpanded] = useState(false);

    const video = videoDetails?.items?.[0];

    if (!video) return null;

    const { snippet, statistics } = video;

    const removeTimestamps = (text) => {
        return text
            .replace(/(?<!\w)(?:\d{1,2}:)?\d{1,2}:\d{2}(?!\w)/g, "")
            .replace(/^[ \t]+/gm, "");
    };

    const description = removeTimestamps(snippet?.description || "");
    const publishedAt = snippet?.publishedAt;
    const viewCount = statistics?.viewCount;

    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : null;

    const formattedViews = viewCount
        ? Number(viewCount).toLocaleString()
        : null;

    return (
        <div className="w-full rounded-2xl bg-gray-100 dark:bg-gray-900 p-4">
            <div className="text-sm dark:text-gray-200">
                <div className="font-medium mb-2">
                    {formattedViews && `${formattedViews} views`}
                    {formattedViews && formattedDate && " • "}
                    {formattedDate}
                </div>

                <div
                    className={`whitespace-pre-wrap ${expanded ? "" : "line-clamp-1 md:line-clamp-2"
                        }`}
                >
                    {description || "No description available."}
                </div>

                {description && (
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        className="font-semibold mt-2 hover:underline text-blue-400"
                    >
                        {expanded ? "Show less" : "Show more"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoDescription;