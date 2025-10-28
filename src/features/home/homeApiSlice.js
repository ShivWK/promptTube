import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
    reducerPath: "homeApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://youtube.googleapis.com/youtube/v3",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json")
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getPopularVideos: builder.query({
            query: () => ({
                url: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: Number.MAX_VALUE,
            refetchOnFocus: false
        }),

        getVideoCategories: builder.query({
            query: () => ({
                url: `/videoCategories?part=snippet&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: Number.MAX_VALUE,
            refetchOnFocus: false,
        }),

        getCategoryVideos: builder.query({
            query: ({ id }) => ({
                url: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${id}&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: 600,
            refetchOnFocus: false,
        }),

        getRelatedVideos: builder.query({
            query: ({ videoId }) => ({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=15&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET",
            })
        }),

        getComments: builder.query({
            query: ({ videoId }) => ({
                url: `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=20&order=relevance&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            })
        }),

        getSearchVideos: builder.query({
            query: ({ searchedTerm }) => ({
                url: `/search?part=snippet&maxResults=25&maxResults=25&type=video&order=rating&q=${searchedTerm}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET",
            })
        })
    })
});

export default homeApiSlice;

export const {
    useGetPopularVideosQuery,
    useLazyGetVideoCategoriesQuery,
    useLazyGetPopularVideosQuery,
    useLazyGetRelatedVideosQuery,
    useLazyGetCommentsQuery,
    useLazyGetSearchVideosQuery,
    useLazyGetCategoryVideosQuery,
} = homeApiSlice