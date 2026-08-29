import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const aiApiSlice = createApi({
    reducerPath: "aiApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/ai`,
    }),
    tagTypes: ["Transcript", "KeyTakeaways", "Summary", "SmartSearch", "MetaData"],
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

        getVideoMetaData: builder.query({
            query: ({ videoId }) => ({
                url: "/metadata",
                method: "POST",
                body: { videoId }
            }),

            providesTags: (result, error, { videoId }) =>
                result ? [{ type: "MetaData", id: videoId }] : [],
        }),

        getSummary: builder.query({
            query: ({ videoId, transcript, videoMetadata }) => ({
                url: "/query",
                method: "POST",
                body: {
                    mode: "summary",
                    videoId,
                    transcript,
                    videoMetadata
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
            query: ({ videoId, transcript, videoMetadata }) => ({
                url: "/query",
                method: "POST",
                body: {
                    mode: "keyPoints",
                    videoId,
                    transcript,
                    videoMetadata
                },
            }),

            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}-${queryArgs.videoId}`,

            providesTags: (result, error, { videoId }) => [
                { type: "KeyTakeaways", id: videoId },
            ],
        }),

        askQuestion: builder.query({
            query: ({ transcript, question, videoMetadata }) => ({
                url: "/query",
                method: "POST",
                body: {
                    mode: "question",
                    transcript,
                    question,
                    videoMetadata
                },
            }),
        }),

        smartSearch: builder.query({
            query: ({ smartQuery }) => ({
                url: "/smartQuery",
                method: "POST",
                body: { smartQuery }
            }),

            providesTags: (result, error, { smartQuery }) => {
                if (!result.success) return;

                return [{ type: "SmartSearch", id: smartQuery }]
            }
        })
    })
});

export default aiApiSlice;

export const {
    useLazyGetTranscriptionQuery,
    useLazyGetSummaryQuery,
    useLazyGetKeyTakeawaysQuery,
    useLazyAskQuestionQuery,
    useLazySmartSearchQuery,
    useSmartSearchQuery,
    useLazyGetVideoMetaDataQuery,
} = aiApiSlice;