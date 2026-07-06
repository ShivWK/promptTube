import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userActivityApiSlice = createApi({
    reducerPath: "userActivityApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/user`,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    keepUnusedDataFor: 60 * 10, // 10 mins
    tagTypes: ["UserData", "SavedVideos", "Subscriptions", "Comments"],

    endpoints: (builder) => ({
        getSavedVideos: builder.query({
            query: ({ userId }) => ({
                url: `/memoryVideos?userId=${userId}`,
                method: "GET",
            }),

            providesTags: (result, error, { userId }) => {
                if (!result?.success) return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "SavedVideos", id: userId },
                ];
            }
        }),

        getSubscriptions: builder.query({
            query: ({ userId }) => ({
                url: `/subscription?userId=${userId}`,
                method: "GET",
            }),

            providesTags: (result, error, { userId }) => {
                if (!result.success) return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "Subscriptions", id: userId },
                ];
            }
        }),

        getComments: builder.query({
            query: ({ userId }) => ({
                url: `/comments?userId=${userId}`,
                method: "GET",
            }),

            providesTags: (result, error, { userId }) => {
                if (!result.success) return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "Comments", id: userId },
                ];
            }
        })
    })
});

export default userActivityApiSlice;

export const {
    useLazyGetSavedVideosQuery,
    useLazyGetSubscriptionsQuery,
    useLazyGetCommentsQuery
} = userActivityApiSlice;