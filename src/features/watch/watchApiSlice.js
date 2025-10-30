import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const watchApiSlice = createApi({
    reducerPath: "watchApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://youtube.googleapis.com/youtube/v3/",
    }),

    endpoints: (builder) => ({
        getVideoById: builder.query({
            query: ({ id }) => ({
                url: `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET",
            }),

            keepUnusedDataFor: 600,
            refetchOnFocus: false,
        }),

        getRelatedVideos: builder.query({
            query: ({ videoId }) => ({
                // search?part=snippet&relatedToVideoId={VIDEO_ID}&type=video&key={YOUR_API_KEY}
                url: `/search?part=snippet&maxResults=25&type=video&order=rating&relatedToVideoId=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            })
        }),

        getComments: builder.query({
            query: ({ videoId }) => ({
                url: `commentThreads?part=snippet&videoId=${videoId}&maxResults=100&order=relevance&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            })
        }),

        getChannelDetails: builder.query({
            query: ({ channelId }) => ({
                url: `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            })
        })
    })
});

export default watchApiSlice;

export const {
    useLazyGetVideoByIdQuery,
    useLazyGetRelatedVideosQuery,
    useLazyGetChannelDetailsQuery,
    useLazyGetCommentsQuery
} = watchApiSlice;