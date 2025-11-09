import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userActivityApiSlice = createApi({
    reducerPath: "userActivityApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://prompttube.onrender.com/api/v1/user",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    keepUnusedDataFor: 600,

    endpoints: (builder) => ({
        getSavedVideos: builder.query({
            query: ({ userId }) => ({
                url: `/memoryVideos?userId=${userId}`,
                method: "GET",
            })
        }),
        
        getSubscriptions: builder.query({
            query: ({ userId }) => ({
                url: `/subscription?userId=${userId}`,
                method: "GET",
            })
        }),

        getComments: builder.query({
            query: ({ userId }) => ({
                url: `/comments?userId=${userId}`,
                method: "GET",
            })
        })
    })
});

export default userActivityApiSlice;

export const {
    useLazyGetSavedVideosQuery,
    useLazyGetSubscriptionsQuery,
    useLazyGetCommentsQuery
} = userActivityApiSlice;