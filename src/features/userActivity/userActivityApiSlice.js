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

        addSavedVideo: builder.mutation({
            query: ({ userId, videoId, videoType }) => ({
                url: "/memoryVideos",
                method: "PATCH",
                body: {
                    userId,
                    videoId,
                    videoType,
                },
            }),

            async onQueryStarted(
                { userId, videoId, videoType },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getSavedVideos",
                        { userId },
                        (draft) => {
                            if (!draft?.data) return;

                            console.log("Update ran")

                            const savedVideo = draft.data.find(
                                item => item.videoType === videoType
                            );

                            if (!savedVideo) {
                                draft.data.push({
                                    userId,
                                    videoId: [videoId],
                                    videoType,
                                })

                                console.log("Update made 1")
                                return;
                            };

                            if (!savedVideo.videoId.includes(videoId)) {
                                savedVideo.videoId.push(videoId);
                            }

                            console.log("Update made 2")
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        removeSavedVideo: builder.mutation({
            query: ({ userId, videoId, videoType }) => ({
                url: "/memoryVideos",
                method: "DELETE",
                body: {
                    userId,
                    videoId,
                    videoType,
                },
            }),

            async onQueryStarted(
                { userId, videoId, videoType },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getSavedVideos",
                        { userId },
                        (draft) => {
                            if (!draft?.data) return;

                            const savedVideo = draft.data.find(
                                item => item.videoType === videoType
                            );

                            if (!savedVideo) return;

                            savedVideo.videoId = savedVideo.videoId.filter(
                                id => id !== videoId
                            );
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        getSubscriptions: builder.query({
            query: ({ userId }) => ({
                url: `/subscription`,
                method: "POST",
                body: { userId }
            }),

            providesTags: (result, error, { userId }) => {
                if (!result?.success !== "success") return [];

                return [
                    { type: "UserData", id: "LIST" },
                    { type: "Subscriptions", id: userId },
                ];
            }
        }),

        subscription: builder.mutation({
            query: ({ userId, channelId }) => ({
                url: `/subscription`,
                method: "PATCH",
                body: { userId, channelId },
            }),

            async onQueryStarted({ userId, channelId, }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getSubscriptions",
                        { userId },
                        (draft) => {
                            if (!draft?.data?.length) return;

                            const subscription = draft.data[0];

                            if (!subscription.channelId.includes(channelId)) {
                                subscription.channelId.push(channelId);
                                console.log("Added Optimistically")
                            }
                        }
                    )
                )

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo()
                }
            },
        }),

        unsubscribe: builder.mutation({
            query: ({ userId, channelId }) => ({
                url: "/subscription",
                method: "DELETE",
                body: { userId, channelId }
            }),

            async onQueryStarted(
                { userId, channelId },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getSubscriptions",
                        { userId },
                        (draft) => {
                            if (!draft?.data?.length) return;

                            const subscription = draft.data[0];

                            subscription.channelId =
                                subscription.channelId.filter(
                                    id => id !== channelId
                                );
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
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

        addComment: builder.mutation({
            query: ({ userId, videoId, comment }) => ({
                url: "/comments",
                method: "PATCH",
                body: {
                    userId,
                    videoId,
                    comment,
                },
            }),

            async onQueryStarted(
                { userId, videoId, comment },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getComments",
                        { userId },
                        (draft) => {
                            if (!draft?.data) return;

                            draft.data.push({
                                // temporary ID for optimistic UI
                                _id: `temp-${Date.now()}`,
                                userId,
                                videoId,
                                comment,
                            });
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        removeComment: builder.mutation({
            query: ({ userId, videoId, comment }) => ({
                url: "/comments",
                method: "DELETE",
                body: {
                    userId,
                    videoId,
                    comment,
                },
            }),

            async onQueryStarted(
                { userId, videoId, comment },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    userActivityApiSlice.util.updateQueryData(
                        "getComments",
                        { userId },
                        (draft) => {
                            if (!draft?.data) return;

                            const index = draft.data.findIndex(
                                item =>
                                    item.videoId === videoId &&
                                    item.comment === comment
                            );

                            if (index !== -1) {
                                draft.data.splice(index, 1);
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
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
    useGetSavedVideosQuery,
    useAddSavedVideoMutation,
    useRemoveSavedVideoMutation,

    useGetSubscriptionsQuery,
    useSubscriptionMutation,
    useLazyGetSubscriptionsQuery,
    useUnsubscribeMutation,

    useLazyGetCommentsQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
    useRemoveCommentMutation,

    useUploadProfilePictureMutation,
} = userActivityApiSlice;