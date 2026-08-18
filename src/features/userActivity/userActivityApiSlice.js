import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../utils/firebaseConfig";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/user`,

    prepareHeaders: (headers) => headers,
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
    const user = auth.currentUser;

    if (user) {
        const idToken = await user.getIdToken();

        if (typeof args === "string") {
            args = {
                url: args,
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            };
        } else {
            args = {
                ...args,
                headers: {
                    ...args.headers,
                    Authorization: `Bearer ${idToken}`,
                },
            };
        }
    }

    if (typeof args !== "string" && args.body instanceof FormData) {
        if (args.headers) {
            delete args.headers["Content-Type"];
        }
    }


    return rawBaseQuery(args, api, extraOptions);
};

const userActivityApiSlice = createApi({
    reducerPath: "userActivityApiSlice",
    baseQuery: baseQueryWithAuth,
    keepUnusedDataFor: 60 * 10, // 10 mins
    tagTypes: ["UserData", "SavedVideos", "Subscriptions", "Comments"],

    endpoints: (builder) => ({
        getSavedVideos: builder.query({
            query: ({ userId }) => ({
                url: `/memoryVideos`,
                method: "POST",
                body: { userId }
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
                url: `/subscription`,
                method: "POST",
                body: { userId }
            }),

            providesTags: (result, error, { userId }) => {
                if (!result?.success) return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "Subscriptions", id: userId },
                ];
            }
        }),

        getComments: builder.query({
            query: ({ userId }) => ({
                url: `/comments`,
                method: "POST",
                body: { userId }
            }),

            providesTags: (result, error, { userId }) => {
                if (!result?.success) return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "Comments", id: userId },
                ];
            }
        }),

        uploadProfilePicture: builder.mutation({
            query: (formdata) => ({
                url: "/profilePicture",
                method: "PATCH",
                body: formdata
            })
        })
    })
});

export default userActivityApiSlice;

export const {
    useLazyGetSavedVideosQuery,
    useLazyGetSubscriptionsQuery,
    useLazyGetCommentsQuery,
    useUploadProfilePictureMutation,
} = userActivityApiSlice;