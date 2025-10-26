import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSmall: false,
    isHomeLoading: true,
    videos: [],
    openSidebar: false,
    slideOpenSidebar: false,
    searchSuggestionsLoading: false,
    searchSuggestions: [],
};

const homeSlice = createSlice({
    name: "home",
    initialState,

    reducers: {
        setIsSmall: (state, action) => {
            state.isSmall = action.payload;
        },

        setHomeLoading: (state, action) => {
            state.isHomeLoading = action.payload
        },

        setHomeVideos: (state, action) => {
            state.videos = action.payload
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
        }
    }
});

export default homeSlice.reducer;

export const selectIsSmall = (state) => state.home.isSmall;
export const selectHomeLoading = (state) => state.home.isHomeLoading;
export const selectHomeVideos = state => state.home.videos;
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
export const selectSuggestions = (state) => state.home.searchSuggestions;
export const selectSuggestionsLoading = (state) => state.home.searchSuggestionsLoading;

export const {
    setHomeLoading,
    setHomeVideos,
    setSidebar,
    setIsSmall,
    setSearchSuggestions,
    setSearchSuggestionsLoading,
} = homeSlice.actions;
