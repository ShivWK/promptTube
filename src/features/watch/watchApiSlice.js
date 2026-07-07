import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const watchApiSlice = createApi({
    reducerPath: "watchApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://youtube.googleapis.com/youtube/v3/",
    }),
    tagTypes: ["Watch", "Video", "Comment", "Channel"],
    keepUnusedDataFor: 60 * 10,

    endpoints: (builder) => ({
        getVideoById: builder.query({
            query: ({ id }) => ({
                url: `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET",
            }),

            providesTags: (result, error, { id }) => {
                if (!result?.items?.length) return [];

                return [
                    { type: "Watch", id: "List" },
                    { type: "Video", id }
                ]
            },
        }),

        getComments: builder.query({
            query: ({ id }) => ({
                url: `commentThreads?part=snippet&videoId=${id}&maxResults=100&order=relevance&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            providesTags: (result, error, { id }) => {
                if (!result?.items?.length) return [];

                return [
                    { type: "Watch", id: "List" },
                    { type: "Comment", id }
                ]
            },

        }),

        getChannelDetails: builder.query({
            query: ({ id }) => ({
                url: `channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            providesTags: (result, error, { id }) => {
                if (!result?.items?.length) return [];

                return [
                    { type: "Watch", id: "List" },
                    { type: "Channel", id }
                ]
            },

            refetchOnMount: true
        }),

        getChannelVideos: builder.query({
            query: ({ id }) => ({
                url: `playlistItems?part=snippet%2CcontentDetails&playlistId=${id}&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: 'GET'
            })
        }),
    })
});

export default watchApiSlice;

export const {
    useLazyGetVideoByIdQuery,
    useLazyGetChannelDetailsQuery,
    useLazyGetCommentsQuery,
    useLazyGetChannelVideosQuery,
} = watchApiSlice;