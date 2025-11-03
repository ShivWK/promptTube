import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchSuggestionsCache: {},
    searchSuggestionLoading: false,
    searchSuggestions: [],
    searchResultLoading: false,
    searchResults: []
}

const searchSlice = createSlice({
    name: "search",
    initialState,

    reducers: {
        setSearchSuggestionsCache: (state, action) => {
            const { term, result } = action.payload;
            state.searchSuggestionsCache[term] = result;
        },

        setSearchSuggestions: (state, action) => {
            const { mode, value: { loading, suggestions } } = action.payload;

            state.searchSuggestionLoading = loading;
            if (mode !== "loading") {
                state.searchSuggestions = suggestions;
            }
        },

        setSearchResult: (state, action) => {
            const { mode, value: { loading, suggestions } } = action.payload;

            state.searchResultLoading = loading;
            if (mode !== "loading") {
                state.searchResults = suggestions;
            }
        },
    }
});

export default searchSlice.reducer;

export const selectSearchSuggestionsCache = (state) => state.search.searchSuggestionsCache;

export const selectSearchSuggestions = createSelector(
    [
        state => state.search.searchSuggestionLoading,
        state => state.search.searchSuggestions
    ],
    (loading, value) => ({ loading, value })
)

export const selectSearchResults = createSelector(
    [
        state => state.search.searchResultLoading,
        state => state.search.searchResults
    ],
    (loading, value) => ({ loading, value })
)

export const {
    setSearchSuggestionsCache,
    setSearchSuggestions,
    setSearchResult
} = searchSlice.actions;