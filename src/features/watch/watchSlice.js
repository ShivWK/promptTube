import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlaying: {},
}

const watchSlice = createSlice({
    name: "watch",
    initialState,

    reducers: {
        setCurrentPlaying: (state, action) => {
            state.currentPlaying = action.payload;
        }
    }
});

export default watchSlice.reducer;

export const selectCurrentPlaying = state => state.watch.currentPlaying;

export const { setCurrentPlaying } = watchSlice.actions;