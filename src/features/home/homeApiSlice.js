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
                url: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: Number.MAX_VALUE,
            refetchOnFocus: false
        }),

        getVideoCategories: builder.query({
            query: () => ({
                url: `/videoCategories?part=snippet&regionCode=US&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: Number.MAX_VALUE,
            refetchOnFocus: false,
        }),

        getCategoryVideos: builder.query({
            query: ({ id }) => ({
                url: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${id}&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: 600,
            refetchOnFocus: false,
        }),

        getSearchVideos: builder.query({
            query: ({ searchedTerm }) => ({
                url: `/search?part=snippet&maxResults=25&type=video&order=rating&q=${searchedTerm}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
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
    useLazyGetSearchVideosQuery,
    useLazyGetCategoryVideosQuery,
} = homeApiSlice