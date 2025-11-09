import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    subscriptions: [],
    comments: []
}

export const setSubscription = createAsyncThunk("userActivity/setSubscription", () => {});

export const setComment = createAsyncThunk("userActivity/setComment", () => {})

const userActivitySlice = createSlice({
    name: "userActivity",
    initialState,

    reducers: {
        manageSubscriptions: (state, action) => {
            const { mode, channelId } = action.payload;

            if (mode === "add") {
                state.subscriptions.push(channelId);
            } else {
                const i = state.subscriptions.indexOf(channelId);
                state.subscriptions.splice(i, 1);
            }
        },

        manageComments: (state, action) => {
            const { mode, comment } = action.payload;

            if (mode === "add") {
                state.comments.push(comment);
            } else {
                const i = state.comments.indexOf(comment);
                state.comments.splice(i, 1);
            }
        }
    }
});

export default userActivitySlice.reducer;

export const selectSubscriptions = state => state.userActivity.subscriptions;
export const selectComments = state => state.userActivity.comments;

export const { manageSubscriptions, manageComments } = userActivitySlice.actions;