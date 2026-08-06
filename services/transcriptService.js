import { YoutubeTranscript } from "youtube-transcript";

export const getTranscript = async (videoId) => {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    return transcript
        .map(item => item.text)
        .join(" ");
};