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
        getPopularVideos: builder.infiniteQuery({

            query: ({ pageParam }) => {
                console.log("Called Infinite Query")
                return {
                    url: `/videos?part=snippet%2CcontentDetails%2Cstatistics`
                        + `&chart=mostPopular`
                        + `&maxResults=50`
                        + `${pageParam ? `&pageToken=${pageParam}` : ""}`
                        + `&regionCode=US`
                        + `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                    method: "GET"
                }
            },

            keepUnusedDataFor: 60 * 60,

            infiniteQueryOptions: {
                initialPageParam: "",
                getNextPageParam: (lastPage) => {
                    return lastPage.nextPageToken ?? undefined;
                },
                getPreviousPageParam: () => undefined,
                maxPages: 5,
            },
        }),

        getVideoCategories: builder.query({
            query: () => ({
                url: `/videoCategories?part=snippet&regionCode=US&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: 60 * 60,
        }),

        getCategoryVideos: builder.infiniteQuery({
            query: ({ queryArg: id, pageParam }) => ({
                url: `/videos?part=snippet%2CcontentDetails%2Cstatistics`
                    + `&chart=mostPopular&regionCode=US`
                    + `&videoCategoryId=${id}`
                    + `&maxResults=50`
                    + `${pageParam ? `&pageToken=${pageParam}` : ""}`
                    + `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            }),

            keepUnusedDataFor: 60 * 60,

            infiniteQueryOptions: {
                initialPageParam: "",
                getNextPageParam: (lastPage) => {
                    return lastPage.nextPageToken ?? undefined;
                },
                getPreviousPageParam: () => undefined,
                maxPages: 5,
            },
        }),

        getSearchVideos: builder.query({
            query: ({ queryArg: searchedTerm, pageParam }) => ({
                url: `/search?part=snippet&maxResults=25`
                    + `&type=video&order=rating`
                    + `&q=${searchedTerm}`
                    + `&maxResults=50`
                    + `${pageParam ? `&pageToken=${pageParam}` : ""}`
                    + `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET",
            }),

            // infiniteQueryOptions: {
            //     initialPageParam: "",
            //     getNextPageParam: (lastPage) => {
            //         return lastPage.nextPageToken ?? undefined;
            //     },
            //     getPreviousPageParam: () => undefined,
            //     maxPages: 5,
            // },
        })
    })
});

export default homeApiSlice;

export const {
    useGetPopularVideosInfiniteQuery,
    useGetCategoryVideosInfiniteQuery,
    useLazyGetVideoCategoriesQuery,
    useLazyGetPopularVideosQuery,
    useLazyGetSearchVideosQuery,
    useLazyGetCategoryVideosQuery,
} = homeApiSlice