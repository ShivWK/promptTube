import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
    reducerPath: "homeApiSlice",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "https://youtube.googleapis.com/youtube/v3/videos",
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json")
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getPopularVideos: builder.query({
            query: () => ({
                url: `?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
                method: "GET"
            })
        })
    })
});

export default homeApiSlice;

export const {
    useGetPopularVideosQuery,
    useLazyGetPopularVideosQuery
} = homeApiSlice