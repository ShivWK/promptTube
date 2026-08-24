import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlaying: {},
    currentChannel: {},
}

const watchSlice = createSlice({
    name: "watch",
    initialState,

    reducers: {
        setCurrentPlaying: (state, action) => {
            state.currentPlaying = action.payload;
        },

        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
    },
});

export default watchSlice.reducer;

export const selectCurrentPlaying = state => state.watch.currentPlaying;
export const selectCurrentChannel = state => state.watch.currentChannel;

export const {
    setCurrentPlaying,
    setCurrentChannel,
} = watchSlice.actions;