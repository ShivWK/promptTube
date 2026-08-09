import {
    calculateTextRelevance,
    calculateTitleRelevance,
} from "./textRelevance.js";

const getRecencyScore = (publishTime) => {
    if (!publishTime) return 0;

    const publishedDate = new Date(publishTime);

    if (Number.isNaN(publishedDate.getTime())) {
        return 0;
    }

    const now = Date.now();
    const ageInDays =
        (now - publishedDate.getTime()) /
        (1000 * 60 * 60 * 24);

    /*
        Newer videos get a higher score.

        0 days  -> 1
        30 days -> ~0.92
        180 days -> ~0.5
        1 year -> ~0.2
        Older -> approaches 0
    */

    return Math.max(
        0,
        Math.exp(-ageInDays / 365)
    );
};

const getShortsPenalty = (video) => {
    const title = video?.snippet?.title?.toLowerCase() || "";
    const description =
        video?.snippet?.description?.toLowerCase() || "";

    const isShort =
        title.includes("#shorts") ||
        description.includes("#shorts");

    return isShort ? 0.65 : 1;
};

export const rankVideos = (videos, query) => {
    if (!Array.isArray(videos)) {
        return [];
    }

    const rankedVideos = videos.map((video, index) => {
        const title = video?.snippet?.title || "";
        const description = video?.snippet?.description || "";

        const titleRelevance = calculateTitleRelevance(query, title);

        const descriptionRelevance = calculateTextRelevance(query, description);

        const combinedText = `${title} ${description}`;

        const overallRelevance = calculateTextRelevance(query, combinedText);

        const recencyScore = getRecencyScore(
            video?.snippet?.publishedAt ||
            video?.snippet?.publishTime
        );

        const shortsPenalty = getShortsPenalty(video);

        const relevanceScore = (
            titleRelevance * 0.55 +
            descriptionRelevance * 0.30 +
            overallRelevance * 0.15
        );

        const finalScore = (
            relevanceScore * 0.85 +
            recencyScore * 0.15
        ) * shortsPenalty;

        return {
            ...video,

            smartSearch: {
                originalRank: index + 1,

                scores: {
                    titleRelevance,
                    descriptionRelevance,
                    overallRelevance,
                    recencyScore,
                    shortsPenalty,
                    finalScore,
                },

                score: Number(
                    (finalScore * 100).toFixed(2)
                ),
            },
        };
    });

    return rankedVideos.sort((a, b) => b.smartSearch.score - a.smartSearch.score);
};