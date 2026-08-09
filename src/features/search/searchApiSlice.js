import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApiSlice = createApi({
    reducerPath: "searchApiSlice",

    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_SERVER_URL}/api/v1/youtube`,
    }),
    
    keepUnusedDataFor: 60 * 10, // 10 mins
    tagTypes: ["Suggestions"],

    endpoints: (builder) => ({
        getSearchSuggestions: builder.query({
            query: ({ searchQuery }) => ({
                url: `/searchSuggestion?query=${searchQuery}`,
                method: "GET",
            }),

            providesTags: (result, _, { searchQuery }) => {
                if (!result?.success) return [];

                return [
                    { type: "Suggestions", id: "LIST" },
                    { type: "Suggestions", id: searchQuery },
                ];
            }
        }),
    })
});

export default searchApiSlice;

export const { useLazyGetSearchSuggestionsQuery } = searchApiSlice;