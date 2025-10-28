import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSmall: false,
    categoryVideosLoading: false,
    categoryVideos:[],
    openSidebar: false,
    slideOpenSidebar: false,
    searchSuggestionsLoading: false,
    searchSuggestions: [],
    searchResult: [],
    searchLoading: false,
};

const homeSlice = createSlice({
    name: "home",
    initialState,

    reducers: {
        setCategoryVideo: (state, action) => {
            const { value, loading } = action.payload;

            state.categoryVideos = value;
            state.categoryVideosLoading = loading;
        },

        setIsSmall: (state, action) => {
            state.isSmall = action.payload;
        },

        setSidebar: (state, action) => {
            const { mode, value } = action.payload;

            if (mode === "All") {
                state.openSidebar = value;
                state.slideOpenSidebar = value;
            } else if (mode === "open") {
                state.openSidebar = value;
            } else if (mode === "slide") {
                state.slideOpenSidebar = value;
            }
        },

        setSearchSuggestions: (state, action) => {
            state.searchSuggestions = action.payload;
        },

        setSearchSuggestionsLoading: (state, action) => {
            state.searchSuggestionsLoading = action.payload;
        },

        setSearchResult: (state, action) => {
            console.log(action.payload);
            state.searchResult = action.payload;
        },

        setSearchLoading: (state, action) => {
            state.searchLoading = action.payload;
        }
    }
});

export default homeSlice.reducer;

export const selectIsSmall = (state) => state.home.isSmall;
export const selectSuggestions = (state) => state.home.searchSuggestions;
export const selectSuggestionsLoading = (state) => state.home.searchSuggestionsLoading;
export const selectSearchResult = (state) => state.home.searchResult;
export const selectSearchLoading = (state) => state.home.searchLoading;

export const selectSidebar = createSelector(
    [
        state => state.home.openSidebar,
        state => state.home.slideOpenSidebar
    ],
    (openSidebar, slideOpenSidebar) => ({
        openSidebar,
        slideOpenSidebar
    })
)

export const selectCategoryVideos = createSelector(
    [
        state => state.home.categoryVideos,
        state => state.home.categoryVideosLoading,
    ],
    (value, loading) => ({
        value,
        loading,
    })
)

export const {
    setSidebar,
    setIsSmall,
    setSearchSuggestions,
    setSearchSuggestionsLoading,
    setSearchResult,
    setSearchLoading,
    setCategoryVideo,
} = homeSlice.actions;
