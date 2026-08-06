import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const aiApiSlice = createApi({
    reducerPath: "aiApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/ai`,
    }),
    tagTypes: ["Transcript", "KeyTakeaways", "Summary", "Question"],
    keepUnusedDataFor: 60 * 60 * 24,

    endpoints: (builder) => ({
        getTranscription: builder.query({
            query: ({ videoId }) => ({
                url: '/transcript',
                method: "POST",
                body: { videoId }
            }),

            providesTags: (result, error, { videoId }) =>
                result ? [{ type: "Transcript", id: videoId }] : [],
        }),

        getSummary: builder.query({
            query: ({ videoId, transcript }) => ({
                url: "/query",
                method: "POST",
                body: {
                    mode: "summary",
                    videoId,
                    transcript,
                },
            }),

            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.videoId}`;
            },

            providesTags: (result, error, { videoId }) => [
                { type: "Summary", id: videoId },
            ],
        }),

        getKeyTakeaways: builder.query({
            query: ({ videoId, transcript }) => ({
                url: "/key-takeaways",
                method: "POST",
                body: {
                    videoId,
                    transcript,
                },
            }),

            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}-${queryArgs.videoId}`,

            providesTags: (result, error, { videoId }) => [
                { type: "KeyTakeaways", id: videoId },
            ],
        }),

        askQuestion: builder.mutation({
            query: ({ transcript, question }) => ({
                url: "/question",
                method: "POST",
                body: {
                    transcript,
                    question,
                },
            }),
        })
    })
});

export default aiApiSlice;

export const {
    useLazyGetTranscriptionQuery,
    useLazyGetSummaryQuery,
    useAskQuestionMutation
} = aiApiSlice;