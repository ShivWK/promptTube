import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
    reducerPath: "homeApiSlice",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "https://youtube.googleapis.com",
        prepareHeaders: (headers) => {
            // headers.set("Authorization" , `Bearer ${import.meta.env.VITE_GOOGLE_API_KEY}`)
            headers.set("Accept", "application/json")
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getPopularVideos: builder.query({
            query: () => ({
                url: `/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
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