export const parseYouTubeDuration = (duration = "") => {
    if (!duration) return 0;

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) return 0;

    const hours = Number(match[1] || 0);
    const minutes = Number(match[2] || 0);
    const seconds = Number(match[3] || 0);

    return (hours * 60 * 60 + minutes * 60 + seconds);
};

export const conciseYoutubeMetadata = (metadata) => {
    const videoMetadata = {
        title: metadata.snippet?.title,
        channelName: metadata.snippet?.channelTitle,
        publishedAt: metadata.snippet?.publishedAt,
        duration: parseYouTubeDuration(metadata.contentDetails?.duration),
        language:
            metadata.snippet?.defaultLanguage ||
            metadata.snippet?.defaultAudioLanguage ||
            null,
        description: metadata.snippet?.description,
        viewCount: metadata.statistics?.viewCount,
        likeCount: metadata.statistics?.likeCount,
        commentCount: metadata.statistics?.commentCount,
    };

    return videoMetadata;
}